import {Box, Button, Grommet, Heading, Image, List, Main, RangeInput, ResponsiveContext, Tab, Tabs, Text} from 'grommet';

import {Apps, Close, Download, MapLocation} from 'grommet-icons';
import React, {Component} from "react";
import AppBar from "../Components/Navbars/AppBar";
import NavBar from "../Components/Navbars/NavBar";
import VectorLayers from "../Data/MVTs.json"
import Layers from "../Data/data.json"
import OlMap from "../Components/Maps/OlMap";
import BoundryDropdown from "../Components/Dropdowns/boundryDropdown";
import {saveAs} from 'file-saver';
import {fromLonLat} from "ol/proj";


function parseQueryStringToDictionary(queryString) {
    const dictionary = {};

    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);
    } else {
        return {exists: false}
    }

    // Step 1: separate out each key/value pair
    const parts = queryString.split('&');

    for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        // Step 2: Split Key/Value pair
        const keyValuePair = p.split('=');

        // Step 3: Add Key/Value pair to Dictionary object
        const key = keyValuePair[0];
        let value = keyValuePair[1];

        // decode URI encoded string
        value = decodeURIComponent(value);
        value = value.replace(/\+/g, ' ');
        dictionary[key] = value;
    }
    dictionary.exists = true
    // Step 4: Return Dictionary Object
    return dictionary;
}


class Hazard extends Component {
    constructor(props) {
        super(props);
        let z = 4;
        this.query = parseQueryStringToDictionary(this.props.location.search)
        if (this.query.exists) {
            console.log("exists")
            this.query.centroid = this.query.centroid.split(",")
        } else {
            this.query.centroid = [-97.7410, 30.2748]
            z = 6;
        }
        this.changeBoundary  = this.changeBoundary.bind(this)
        this.removeFromList = this.removeFromList.bind(this)
        this.setSideBarState = this.setSideBarState.bind(this)
        this.download = this.download.bind(this)
        this.getLayerNames = this.getLayerNames.bind(this)
        this.setMap = this.setMap.bind(this)
        this.setRasterOpacity = this.setRasterOpacity.bind(this)
        this.addBoundary = this.addBoundary.bind(this)
        this.state = {
            showSidebar: false,
            showMapNavigation: false,
            damageMapUrl: "",
            layers: Layers,   
            rasterOpacity: 1,
            index: 0,
            zoom: z,
            center: fromLonLat(this.query.centroid),
            file_name: [],
            boundary_array: [false, false, false, false],
            huc12_boundary: false,
        };

        //References
        this.map = React.createRef();

        //Legend Props
        // this.grades = [0, 1, 2, 3];
        this.colors = [
            "#00204C",
            "#273F6C",
            "#BBAD6F",
            "#FFE945",]

        // this.years = [
        //     "10-Year",
        //     "100-Year",
        //     "250-Year",
        //     '500-Year']
        // this.width = this.props.width;
        // this.height = this.props.height;
        this.LatLng = [30.3000, -95.5000]

        //UI Props
        this.theme = {
            global: {
                colors: {
                    onyx: "#1b1c20",
                    secondary: '#500000',
                    rain: '#324755',
                    slate: '#6E8CA0',
                    sage: "#87BCBF",
                    snow: 'rgb(200, 209, 211)',
                    sunshine: "#FCC931",
                    ice: "#F0F3F4",
                    fossil: "#C8d1d3",
                    sand: "#b9b0A2"
                },
                font: {
                    family: 'Open Sans',
                    size: '18px',
                    height: '20px',
                },
            },
            tab: {
                active: {
                    background: 'snow',
                    color: 'rain',
                },
                background: 'snow',
                color: 'sage',
                border: {
                    side: 'bottom',
                    color: 'sage',
                    active: {
                        color: 'rain',
                    },
                    hover: {
                        color: 'control',
                    },
                },
            }
        };
    };

    addBoundary(name, url, map_values) {
        // Adds clicked boundary name to download list, updates zoom, and center location to state.
        let removed = this.removeFromList(name)

        let prev_file_name = this.state.file_name
        if (!removed) prev_file_name.push({name: name, url: url})

        this.setState({
            file_name: prev_file_name,
            zoom: map_values.zoom,
            center: map_values.center
        })
    }

    removeFromList(name) {
        // Removes the name from the boundary list.
        // Returns a true or false
        let newFileName = []
        this.state.file_name.forEach(datum=> {

            if (datum.name !== name) {
                newFileName.push(datum)
            }
        });
        let removed = newFileName.length < this.state.file_name.length
        this.setState(() => ({
                file_name: newFileName
            })
        )
        return removed
    }

    changeBoundary(boundary_index) {

        let boundary_array = this.state.boundary_array;

        for (const [index, element] of boundary_array.entries()) {

            boundary_array[index] = (boundary_index === VectorLayers[index].title)


        }
        this.setState({boundary_array: boundary_array})


    }

    setMap(map_values) {

        if ((this.state.zoom !== map_values.zoom) ||
            (this.state.center !== map_values.center)) {
            console.log(map_values)
            this.setState({
                zoom: map_values.zoom,
                center: map_values.center
            })

        }
    }

    setRasterOpacity(rangeInput) {

        this.setState({
            rasterOpacity: rangeInput/10,
            // boundary_array: [true,false,false,false]
        })


        console.log(this.state.rasterOpacity)
    }


    setSideBarState() {

        this.setState(state => ({
                showSidebar: !state.showSidebar
            })
        )


    };

    showMapNavigationState() {
        this.setState(state => ({
                showMapNavigation: !state.showMapNavigation
            })
        )
    }

    componentDidMount() {
    }

    download() {
        this.state.file_name.forEach(function (e) {
            fetch(e.url)
                .then(res => res.blob())
                .then(blob => {
                    saveAs(blob, e.name + ".tif");

                });
        });
        // for (const boundary of this.state.file_name) {
        //     setTimeout(() => { downloadURI(boundary.url, boundary.name+".tif");},500)
        // }
    }

    getLayerNames(l) {

        let names = [];
        l.forEach(layer => {
            names.push(layer.title)
        })

        return names
    }


    render() {
        return (
            <Grommet elevation={"medium"} margin={"small"} theme={this.theme} full={true}>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box background={'snow'}
                             elevation={"medium"} margin={"xxsmall"} fill={true}>
                            <Box >
                                <AppBar margin={"small"} background={"secondary"}>

                                    <Button
                                        icon={<Apps/>}
                                        onClick={() => this.setSideBarState()}/>
                                    <Box  direction="row" pad={'medium'} width={'medium'} height={"xxsmall"} align={'center'}>
                                       <Image fit="contain" src={"/img/tdis.png"}/>
                                        <Heading level='3' margin='small'>Damage Plain</Heading>
                                    </Box>



                                </AppBar>
                            </Box>

                            <Main border={{color: 'secondary', size:"large"}} elevation={"medium"} margin={"small"}
                                  flex direction="row-responsive">
                                <NavBar showSidebar={this.state.showSidebar}
                                        action={this.setSideBarState}
                                        size={size}
                                        width={"medium"}
                                        theme={this.theme}>
                                    <Tabs margin={"xsmall"} flex={"shrink"}>
                                        <Tab title="About">
                                            <Box fill pad="medium" align="center">
                                                <MapLocation size="xlarge" color={'onyx'}/>
                                                <Heading level={3} margin={"small"}>The Damage Plain</Heading>
                                                <Box gap={"small"} size={"small"}>
                                                    <Heading level={4} margin={"none"} color={"slate"}> About: Estimating
                                                    Community Flood Risk</Heading>
                                                    <Text size={"small"}>
                                                        From catastrophic hurricanes to impassable roads, flooding
                                                        causes major issues across Texas. Typically,
                                                        coastal regions garner the most attention, but even drier
                                                        regions regularly flood. Producing a traditional flood model is
                                                        expensive, both in time and money, but machine learning reduces
                                                        these barriers while providing a rapid and accurate assessment
                                                        of flood risk.
                                                    </Text>
                                                    <Text size={"small"}>
                                                        The Damage Plain model is a machine learning product that
                                                        predicts the probability of flood
                                                        loss across the state. The model uses a binary classification
                                                        random forest to
                                                        distinguish between confirmed flooded locations and
                                                        structures. The random forest uses nine topographic, proximity,
                                                        and hydrologic landscape features to predict flooded and
                                                        non-flooded locations.
                                                    </Text>
                                                    <Text size={"small"}>
                                                        This website provides a visual representation of the Damage
                                                        Plain, and a way to download the dataset for any given watershed
                                                        in the state.
                                                    </Text>
                                                </Box>
                                            </Box>
                                        </Tab>

                                        <Tab title="Download">
                                            <Box fill pad="medium" gap={"medium"} align="center">
                                                <Download size="xlarge" color={'onyx'}/>
                                                <Heading level={3} margin={"small"}>Download</Heading>                      
                                                
                                                <Text size={"medium"} margin={"small"}>Opacity of Damage Plain Layer</Text>   
                                                <RangeInput size={"medium"} margin={"small"} 
                                                    min={0} 
                                                    max={10}
                                                    value = {this.state.rasterOpacity * 10}
                                                    onChange={(e)=> this.setRasterOpacity(e.target.value) } />   

                                                <Text size={"small"} margin={"small"}>
                                                    Select the Boundary type from which you want to download the file.
                                                </Text>
                                                <BoundryDropdown OPTIONS={this.getLayerNames(VectorLayers)}
                                                                 changeBoundary={this.changeBoundary}/>
                                                <Button color={"slate"} size={'small'} label={'Clear'}
                                                        onClick={this.changeBoundary}/>
                                                <Text size={"small"} margin={"small"}> Click on the location you want to
                                                    download. </Text>
                                                <Box height={"small"} size={'medium'} overflow={"scroll"}  >
                                                    <List  margin={"xxsmall"} pad={"xxsmall"}
                                                          data={this.state.file_name}>
                                                        {(datum) =>
                                                            <Box direction="row-responsive" pad={"small"} align="center">
                                                                <Text> {datum.name}</Text>
                                                                <Close align={'right'}
                                                                       onClick={() => this.removeFromList(datum.name)}></Close>
                                                            </Box> }
                                                    </List>

                                                </Box>
                                                <Box fill pad="medium" align="center">
                                                    <Button primary color='sage' margin={"small"} label={"Download"}
                                                            onClick={this.download}/>
                                                </Box>

                                            </Box>
                                        </Tab>
                                    </Tabs>
                                </NavBar>


                                <Main align={"center"} justify={"center"}>
                                    <Box direction={"row-responsive"}
                                        // height={"100%"}
                                         responsive={true}
                                         fill={true}>
                                        <OlMap LatLng={this.state.centroid}
                                               changeMap={this.setMap}

                                               parentState={this.state}
                                               layer={this.state.layers}
                                               vector_layer={VectorLayers}
                                            // height="100%"
                                            // width="inherit"
                                               huc8_boundary={this.state.huc8_boundary}
                                               huc12_boundary={this.state.huc12_boundary}
                                               addBoundary={this.addBoundary}
                                               selected_boundaries={this.state.file_name}
                                               styles={this.theme}>

                                        </OlMap>
                                    </Box>
                                </Main>
                            </Main>
                        </Box>
                    )}
                </ResponsiveContext.Consumer>
            </Grommet>
        )
    }
}

export default Hazard;
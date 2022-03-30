import {Box,Tab, Tabs, Button, Grommet, Heading, Main,Text, ResponsiveContext} from 'grommet';
import {Analytics,Menu, Map, MapLocation} from 'grommet-icons';
import React, {Component} from "react";
import AppBar from "../Components/Navbars/AppBar";
import NavBar from "../Components/Navbars/NavBar";
import Layers from "../Data/data.json"
import OlMap from "../Components/Maps/OLMap";

const myObj = [{
        url: "http://13.90.155.245:8080/geoserver/tifs/wms",
        layer: 'Flooding:damagePlain Oversampled',
        title: "Damage Plain Layer",
        tiled: true,
        legend: [
            {value: "500-Year", color: "#FFE945"},
            {value: "250-Year", color: "#BBAD6F"},
            {value: "100-Year", color: "#273F6C"},
            {value: "50-Year", color: "#00204C"}
        ]
    },]
;
const myJSON = JSON.stringify(myObj);


var obj = JSON.parse(myJSON);

function parseQueryStringToDictionary(queryString) {
    var dictionary = {};

    // remove the '?' from the beginning of the
    // if it exists
    if (queryString.indexOf('?') === 0) {
        queryString = queryString.substr(1);

    } else {
        return {exists: false}
    }

    // Step 1: separate out each key/value pair
    var parts = queryString.split('&');

    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        // Step 2: Split Key/Value pair
        var keyValuePair = p.split('=');

        // Step 3: Add Key/Value pair to Dictionary object
        var key = keyValuePair[0];
        var value = keyValuePair[1];

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

        let z = 10;
        this.query = parseQueryStringToDictionary(this.props.location.search)
        if (this.query.exists) {
            console.log("exists")
            this.query.centroid = this.query.centroid.split(",")

        } else {
            this.query.centroid = [-95.5000, 30.0000]
            z = 9;
        }


        this.setSideBarState = this.setSideBarState.bind(this)
        this.state = {
            showSidebar: false,
            showMapNavigation: false,
            boundary: {
                gid: "",
                Flood_Hazard: "",
                centroid: [-95.5000, 30.3000]
            },
            damageMapUrl: "",
            layers: Layers,
            index: 0,
            zoom: z
        };


        console.log(this.state.layers)

        //References
        this.map = React.createRef();

        //Legend Props
        this.grades = [0, 1, 2, 3];
        this.colors = [
            "#00204C",
            "#273F6C",
            "#BBAD6F",
            "#FFE945",]

        this.years = [
            "10-Year",
            "100-Year",
            "250-Year",
            '500-Year']
        this.width = this.props.width;
        this.height = this.props.height;
        this.LatLng = [30.3000, -95.5000]


        //UI Props
        this.theme = {
            global: {
                colors: {
                    onyx: "#1b1c20",
                    whoop: '#500000',
                    rain: '#324755',
                    slate: '#6E8CA0',
                    sage: "#87BCBF",
                    snow: "#FFFFFF",
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

    getZipcodes() {

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


    render() {


        return (
            <Grommet theme={this.theme} full={true}>
                <ResponsiveContext.Consumer>
                    {size => (
                        <Box fill={true}>
                            <Box background={"ice"}>
                                <AppBar background={"whoop"}>
                                    <Button
                                        icon={<Menu/>}
                                        onClick={() => this.setSideBarState()
                                        }
                                    />
                                    <Heading level='3' margin='none'>TDIS</Heading>

                                </AppBar>
                            </Box>
                            <Main flex direction="row-responsive">

                                <NavBar showSidebar={this.state.showSidebar}
                                        action={this.setSideBarState}
                                        size={size}
                                        width={"medium"}
                                >
                                    <Tabs margin={"xsmall"} flex={"shrink"}>
                                        <Tab title="Risk" >
                                            <Box fill pad="medium" align="center" >
                                                <MapLocation size="xlarge" color={'onyx'} />

                                                <Heading level={3} margin={"small"}>What's Your Risk?</Heading>
                                                <Heading level={4} margin={"none"} color={"slate"}> Estimating Community Flood Risk</Heading>
                                                <Box size={"small"} >
                                                <Text size={"small"}  >The creation of new visualizations and maps that better communicate the
                                                    reality of flood risk is the starting point
                                                    for improving community resilience. Having accurate information before, during,
                                                    and after a natural disaster saves lives and protects critical infrastructure
                                                    and property. Maps that link the natural and built environment to the locations
                                                    of people, resources, vulnerabilities, and capabilities enable communities to
                                                    prepare, respond, and recover more effectively from adverse events.

                                                </Text>
                                                </Box>
                                            </Box>
                                        </Tab>
                                        <Tab title="Themes" >
                                            <Box fill pad="large" align="center" background="snow">
                                                <Map size="xlarge" color={'onyx'}/>
                                                <h3>Map Themes</h3>
                                            </Box>
                                        </Tab>
                                        <Tab title="Portfolio" >
                                            <Box fill pad="large" align="center" background="snow">
                                                <Analytics size="xlarge" color={'onyx'}/>
                                                <h3>Community Risk Portfolio</h3>
                                            </Box>
                                        </Tab>
                                    </Tabs>

                                </NavBar>


                                <Main align={"center"} justify={"center"}>
                                    <Box direction="row-responsive"
                                         height={"98%"}
                                         fill={"horizontal"}
                                    >


                                        <OlMap LatLng={this.query.centroid
                                        }
                                               parentState ={this.state}

                                               layer={this.state.layers[this.state.index]}
                                               height="100%"
                                               width="inherit"

                                        >

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
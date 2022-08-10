import React from 'react';
import Map from "./OL/Map";
import {Layers, TileLayer} from "./OL/Layers"
import {osm} from "./OL/Source"

import {Controls, FullScreenControl} from "./OL/Controls";
import OLwmts from "./OL/Layers/OLwmts";
import Legend from "./Legend";
import MVTLayer from "./OL/Layers/MVT";
import {Box} from "grommet";


class OlMap extends React.Component {
    constructor(props) {
        super(props);

        this.setShowLayer2 = this.setShowLayer2.bind(this)
        this.setShowLayer1 = this.setShowLayer1.bind(this)
        this.setRefreshMap = this.setRefreshMap.bind(this)
        this.mapRef = React.createRef()

        this.state = {

            center: this.props.parentState.center,
            zoom: this.props.parentState.zoom,
            showLayer1: true,
            showLayer2: true,
            refreshMap: false,

        }


    }

    componentDidMount() {
    }

    setRefreshMap() {
        this.setState({refreshMap: !this.state.refreshMap})
    }




    setShowLayer2() {
        this.setState({showLayer2: !this.state.showLayer2})
    }

    setShowLayer1() {
        this.setState({showLayer1: !this.state.showLayer1})
    }

    render() {


        return (
            <Box fill={true}>
                <Map parentProps={this.props.parentState} changeMap={this.props.changeMap}>
                    <Layers>
                        <TileLayer
                            source={osm()}
                            zIndex={0}/>
                        <OLwmts
                            layer={this.props.layer[0]}
                            zIndex={1}/>
                        {(this.props.huc8_boundary) &&
                            (<MVTLayer
                                source={this.props.layer[1]}
                                zIndex={2}
                                addBoundary={this.props.addBoundary}
                                style={this.props.styles}
                                selected_boundaries={this.props.selected_boundaries}/>)
                        }
                        {(this.props.huc12_boundary) &&
                            (<MVTLayer
                                source={this.props.layer[2]}
                                zIndex={2}
                                addBoundary = {this.props.addBoundary}
                                style ={this.props.styles}
                                selected_boundaries = {this.props.selected_boundaries}/>)
                        }

                    </Layers>
                    <Controls>
                        <FullScreenControl/>

                    </Controls>
                </Map>
                <Box elevation={"medium"} basis={"medium"} className={"legend"}>
                    <Legend parentState={this.props}></Legend>
                </Box>
            </Box>
        );
    }

}

export default OlMap;
import React from 'react';
import {useContext, useEffect} from "react";
import Map from "./OL/Map";
import {Layers, TileLayer} from "./OL/Layers"
import {Fill, Style} from "ol/style";
import {osm} from "./OL/Source"
import {fromLonLat} from 'ol/proj';
import {Controls, FullScreenControl} from "./OL/Controls";
import MVTLayer from "./OL/Layers/MVT";

import NavBar from "../Navbars/NavBar";
import {Box, CheckBox, Grommet, Heading} from "grommet";
import L from "leaflet";
import OLwmts from "./OL/Layers/OLwmts";
import MapContext from "./OL/Map/MapContext";
import Legend from "./Legend";





class OlMap extends React.Component {
    constructor(props) {
        super(props);
        this.setCenter = this.setCenter.bind(this)
        this.setZoom = this.setZoom.bind(this)
        this.setShowLayer2 = this.setShowLayer2.bind(this)
        this.setShowLayer1 = this.setShowLayer1.bind(this)
        this.setRefreshMap = this.setRefreshMap.bind(this)
        this.mapRef = React.createRef()
        this.mvtRef = React.createRef()
        this.state = {

            center: this.props.LatLng,
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


    setCenter(Changed) {


    }

    setZoom(Zoom) {
        this.setState({zoom: Zoom})

    }

    setShowLayer2(Changed) {
        this.setState({showLayer2: !this.state.showLayer2})
    }

    setShowLayer1(Changed) {
        this.setState({showLayer1: !this.state.showLayer1})
    }

    render() {

        return (
            <div id={"OLMAP"}
                 style={{
                     // height: this.props.height,
                     width: this.props.width
                 }}>

                <Map    parentProps={this.props.parentState}  center={fromLonLat(this.state.center)} zoom={this.state.zoom}
                >
                    <Layers>
                        <TileLayer
                            source={osm()

                            }

                            zIndex={0}
                        />

                            <OLwmts
                                layer={this.props.layer}

                                zIndex={1}
                            />

                    </Layers>
                    <Controls>
                        <FullScreenControl/>

                    </Controls>
                </Map>
                <div class={"legend"}>
                    <Legend parentState ={this.props}></Legend>
                </div>
            </div>
        );
    }

}

export default OlMap;
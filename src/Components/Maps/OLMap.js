import React from 'react';
import Map from "./OL/Map";
import {Layers, TileLayer} from "./OL/Layers"
import {osm} from "./OL/Source"
import {fromLonLat} from 'ol/proj';
import {Controls, FullScreenControl} from "./OL/Controls";
import OLwmts from "./OL/Layers/OLwmts";
import Legend from "./Legend";
import MVTLayer from "./OL/Layers/MVT";
import {Box} from "grommet";


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

    setShowLayer2() {
        this.setState({showLayer2: !this.state.showLayer2})
    }

    setShowLayer1() {
        this.setState({showLayer1: !this.state.showLayer1})
    }

    render() {


        return (
            <Box as={"OlMap"}
                 style={{
                     // height: this.props.height,
                     width: this.props.width
                 }}>

                <Map parentProps={this.props.parentState}  center={fromLonLat(this.state.center)} zoom={this.state.zoom}>
                    <Layers>
                        <TileLayer
                            source={osm()}
                            zIndex={0}/>
                            <OLwmts
                                layer={this.props.layer}
                                zIndex={1}/>
                        {(this.props.huc8_boundary) &&
                            (<MVTLayer
                            source={"https://tdis-geoserver.eastus.cloudapp.azure.com/geoserver/gwc/service/tms/1.0.0/Flooding:Huc-8" +
                                '@EPSG%3A'+900913+'@pbf/{z}/{x}/{-y}.pbf'}
                            zIndex={2}/>)
                        }
                        {(this.props.huc12_boundary) &&
                            (<MVTLayer
                                source={"https://tdis-geoserver.eastus.cloudapp.azure.com/geoserver/gwc/service/tms/1.0.0/Flooding:Huc-12" +
                                    '@EPSG%3A'+900913+'@pbf/{z}/{x}/{-y}.pbf'}
                                zIndex={2}/>)
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
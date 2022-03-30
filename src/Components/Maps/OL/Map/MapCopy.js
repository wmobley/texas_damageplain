import React, {Component, useRef} from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";

class Map extends Component{
	constructor(props) {
		super(props);
		this.mapRef = useRef();
		this.state= {
			map: null,
		}
		this.setMap = this.setMap.bind(this)
		this.options = {
			view: new ol.View(
									this.props.zoom, this.props.center

			),
			layers: [],
			controls: [],
			overlays: []
		};}
		componentDidMount() {
			this.mapObject = new ol.Map(this.options);
			this.mapObject.setTarget(this.mapRef.current);
			this.setMap(this.mapObject);
			this.mapObject.setTarget(undefined);
			if (!this.state.map) return;

			this.state.map.getView().setZoom(this.props.zoom);
			this.state.map.getView().setCenter(this.props.center)
		}



	setMap(obj) {
		this.state={
			map:obj
		}
	}
	render() {
		return(
		<MapContext.Provider value={this.state.map }>
			<div id={"map"} ref={this.mapRef} className="ol-map">
				{this.props.children}
			</div>
		</MapContext.Provider>
		)
	}
}





export default Map;
import {useContext, useEffect, useState} from "react";
import MapContext from "../Map/MapContext";
import 'ol/ol.css';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import * as tilegrid from "ol/tilegrid";
import {Fill, Stroke, Style} from "ol/style";




const MVTLayer = ({ source,  zIndex = 0 ,style, update, addBoundary, selected_boundaries}) => {
	const { map } = useContext(MapContext);
	// const [refresh, setRefresh] = useState(false)

	const selection = []
	selected_boundaries.forEach(boundary=>selection.push(boundary.name))




	useEffect(()=>{

		if (update){
			// let l=map.getLayers().getArray()[1];
			// l.values_.source.setUrl(source)
			// console.log("style", l.getStyle())
				}
	})
	useEffect(() => {
		if (!map) return;


		const boundaryStyle = new Style({
			stroke: new Stroke({
				color: style.global.colors.slate,
				width: 1,
			}),
			fill: new Fill({
				color: style.global.colors.sage +55,

			}),
		});
		const selectedBoundary = new Style({
			stroke: new Stroke({
				color: style.global.colors.whoop,//'rgba(200,20,20,0.8)',
				width: 2,
			}),
			fill: new Fill({
				color: 'rgba(200,20,20,0.4)',
			}),
		});
		let vectorLayer = new VectorTileLayer({
				declutter: true,
				source: new VectorTileSource({
					format: new MVT(),
					tilePixelRatio: 1, // oversampling when > 1
					tileGrid: tilegrid.createXYZ({maxZoom: 19}),
					tileSize: 512,
					url:source,
					defaultDataProjection: 'EPSG:900913',
					crossOrigin: 'anonymous'
				}),
				style: boundaryStyle
			});

		const selectionLayer = new VectorTileLayer({
			map: map,
			renderMode: 'vector',
			source: vectorLayer.getSource(),

			style: function (feature) {
				// console.log(feature.properties_.name in selection)
				if (selection.includes(feature.properties_.name)) {
					return selectedBoundary;
				}
			},
		});
		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);
		map.on(['click'], function (event) {
			vectorLayer.getFeatures(event.pixel).then(function (features) {
				if (!features.length) {
					// setSelection( []);
					selectionLayer.changed();
					return;
				}
				const feature = features[0];
				if (!feature) {
					return;
				}
				const fid = feature.properties_.name;
				addBoundary(feature.properties_.name, feature.properties_.url)
				// setSelection((prevState)=>{
				// 	if (prevState.includes(fid)){
				// 		let index = prevState.indexOf(fid);
				//
				// 		if (index > -1) {
				// 			prevState.splice(index, 1); // Remove array element
				// 		}
				// 		return prevState
				// 	}else{
				// 	prevState.push (fid)
				// 	addBoundary(feature.properties_.name, feature.properties_.url)
				// 	return prevState
				// 	}
				// });

				selectionLayer.changed();


				console.log(feature.properties_.name)

			})
		})
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [source,addBoundary,style,  zIndex, map]);


	return null;
};

export default MVTLayer;
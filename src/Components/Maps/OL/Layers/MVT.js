import {useContext, useEffect} from "react";
import MapContext from "../Map/MapContext";
import 'ol/ol.css';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import * as tilegrid from "ol/tilegrid";
import {Fill, Stroke, Style} from "ol/style";


const MVTLayer = ({ source,  zIndex = 0 ,style, addBoundary, selected_boundaries}) => {
	const { map } = useContext(MapContext);



	useEffect(() => {

		const selection = []
		selected_boundaries.forEach(boundary=>selection.push(boundary.name))
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
				color: style.global.colors.whoop,
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
					selectionLayer.changed();
					return;
				}
				const feature = features[0];
				if (!feature) {
					return;
				}
				addBoundary(feature.properties_.name, feature.properties_.url, map.getView().values_)
				selectionLayer.changed();
			})
		})
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [source,addBoundary,style,  zIndex, map,selected_boundaries]);


	return null;
};

export default MVTLayer;
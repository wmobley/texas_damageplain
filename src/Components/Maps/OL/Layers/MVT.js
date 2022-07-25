import {useContext, useEffect} from "react";
import MapContext from "../Map/MapContext";
import 'ol/ol.css';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import * as tilegrid from "ol/tilegrid";




const MVTLayer = ({ source, style, zIndex = 0 , update, addBoundary}) => {
	const { map } = useContext(MapContext);
	// const [refresh, setRefresh] = useState(false)


	useEffect(()=>{

		if (update){
			// let l=map.getLayers().getArray()[1];
			// l.values_.source.setUrl(source)
			// console.log("style", l.getStyle())
				}
	})
	useEffect(() => {
		if (!map) return;

		let vectorLayer = new VectorTileLayer({
				declutter: false,
				source: new VectorTileSource({
					format: new MVT(),
					tilePixelRatio: 1, // oversampling when > 1
					tileGrid: tilegrid.createXYZ({maxZoom: 19}),
					tileSize: 512,
					url:source,
					defaultDataProjection: 'EPSG:900913',
					crossOrigin: 'anonymous'
				}),
				style: style
			});


		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);
		map.on(['click'], function (event) {
			vectorLayer.getFeatures(event.pixel).then(function (features) {
				if (!features.length) {



					// selection = {};
					// selectionLayer.changed();
					return;
				}
				const feature = features[0];
				if (!feature) {
					return;
				}
				addBoundary(feature.properties_.name, feature.properties_.url)
				console.log(feature.properties_.name)

			})
		})
		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [source,addBoundary, style, zIndex, map]);


	return null;
};

export default MVTLayer;
import {useContext, useEffect, useState} from "react";
import MapContext from "../Map/MapContext";
import 'ol/ol.css';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import * as tilegrid from "ol/tilegrid";




const MVTLayer = ({ source, style, zIndex = 0 , update}) => {
	const { map } = useContext(MapContext);
	const [refresh, setRefresh] = useState(false)


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
					defaultDataProjection: 'EPSG:4326'
				}),
				style: style
			});


		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map]);


	return null;
};

export default MVTLayer;
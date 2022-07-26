import {useContext, useEffect} from "react";
import MapContext from "../Map/MapContext";

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';


const OLwmts = ({ layer, zIndex = 0 }) => {

	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let tileLayer = new TileLayer({

			source: new TileWMS({
				url: layer.url,
				params: {'LAYERS': layer.layer, 'TILED': layer.tiled},
				serverType: 'geoserver',
				transition: 0,

			}),
		})


		map.addLayer(tileLayer);
		tileLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(tileLayer);
			}
		};
	}, [layer, zIndex, map]);

	return null;
};

export default OLwmts;

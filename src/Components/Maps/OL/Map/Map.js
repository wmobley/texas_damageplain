import React, {useEffect, useRef, useState} from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import axios from "axios";


const Map = ({parentProps, changeMap, children,}) => {
    const mapRef = useRef();

    const [map, setMap] = useState(null);

    // on component mount
    useEffect(() => {
        let options = {
            target: 'map',
            view: new ol.View({zoom: parentProps.zoom, center: parentProps.center}),
            layers: [],
            controls: [],
            overlays: []
        };

        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        // var status = document.getElementById('status');
        let selected = null;
        if (mapObject != null) {
            setTimeout(() => {
                mapObject.updateSize();
            }, 300);


        }
        mapObject.on('moveend', () => {
            console.log()
            changeMap(mapObject.values_.view.values_)
        })
        mapObject.on('click', function (e) {

            if (e.dragging) {
                return;
            }

            if (selected !== null) {

                selected = null;
            }
            let layer = mapObject.getLayers().getArray()

            // var viewResolution = /** @type {number} */ (mapObject.values_.view.getResolution());
            const pixel_url = layer[1].values_.source.getFeatureInfoUrl(e.coordinate,
                10,
                'EPSG:3857',
                {'INFO_FORMAT': 'application/json',
                'STYLES':''})

            axios.get(pixel_url).then(response => {
                let layer = parentProps.layers[parentProps.index]
                const returnValue = response.data.features[0].properties[layer.query_column];
                let legend = document.getElementById("Legend").children;
                for (let i = 0; i < legend.length; i++) {
                    if (returnValue>=layer.legend[i]['value-min'] && returnValue<layer.legend[i]['value-max']){
                        legend[i].classList.replace("LegendDecrease","LegendIncrease")
                        legend[i].innerHTML = layer.legend[i]['label']
                        legend[i].style.zIndex = 20
                    }
                    else {
                        legend[i].classList.replace("LegendIncrease", "LegendDecrease")
                        legend[i].innerHTML = ""
                        legend[i].style.zIndex = 19
                    }
                }
            })
        });

        return () => mapObject.setTarget(undefined);

    }, [parentProps, changeMap, children,]);


    // zoom change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setZoom(parentProps.zoom);
    }, [map, parentProps]);

    // center change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setCenter(parentProps.center)
    }, [map, parentProps])


    // get hover effect

    return (
        <MapContext.Provider value={{map}}>
            <div id={"map"} ref={mapRef} className="ol-map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;
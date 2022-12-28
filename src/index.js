
import mapboxgl from 'mapbox-gl';
import { createConflictPopUp } from './popUp';


let mapIds = ["conflicted-zones", "oil-pipelines", "gas-pipelines"];

function toggleLayer(e) {
    e.preventDefault();
    e.stopPropagation();
    const clickedLayer = e.target.id;
    const visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    const lines2 = e.target.getAttribute('lines2');
    console.log(lines2);

    if (visibility === 'visible' || visibility === undefined) {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
    }
    else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer,'visibility','visible');
    }
}


function updateLegends(e) {
    const legendName = e.target.id;
    const allLegends = document.querySelectorAll('div[dataId]');
    for (const legend of allLegends) {
        if (legend.getAttribute('dataId') !== legendName) {
            legend.classList.add('hide');
        }
        else {
            legend.classList.remove('hide');
        }
    }
}


function displayPopUp(e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const div = createConflictPopUp(e.features[0].properties);

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(div)
        .addTo(map);
}


function changeStyle(layer) {
    prevLayers = map.style._layers;
    map.setStyle(layer.target.id);
    isChangeStyle = 1;
}


// ############## MAIN FUNCTION ###################

const allLayers = document.querySelectorAll('#layers a');

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpcnNob2RpcHRvIiwiYSI6ImNsYnlraHR4dDB1Njgzb2xobHZrMG1kY2gifQ.ndu_e63-o0H8MAWnvQ3EWA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shirshodipto/clc35ntfr005114mp3i4fd3i7',
    center: [11.172883, 39.720579],
    zoom: 1.48,
});


const viewInputs = document.querySelectorAll('#map-styles input');
let prevLayers;
let isChangeStyle = 0;
 
for (const input of viewInputs) {
    input.onclick = (layer) => {
        changeStyle(layer);
    };
}


map.on('idle', () => {
    allLayers.forEach((layer) => {
        layer.onclick = toggleLayer;
        console.log('idle');
    })

    // if the map has changed style, load 
    // previous styles layers
    if (isChangeStyle === 1) {
        for (const layer of mapIds) {
            const prevVis = prevLayers[`${layer}`].visibility;
            console.log(prevVis);
            map.setLayoutProperty(layer, 'visibility', prevVis);
        }
        isChangeStyle = 0;
    }
});


const legendsInputs = document.querySelectorAll('.legends-inputs input');

for (const input of legendsInputs) {
    input.onclick = updateLegends;
}


// add popup features
map.on('click', 'conflicted-zones', (e) => {
    displayPopUp(e);
})

map.on('mouseenter', 'conflicted-zones', () => {
    map.getCanvas().style.cursor = 'pointer';
});
        
map.on('mouseleave', 'conflicted-zones', () => {
    map.getCanvas().style.cursor = '';
});
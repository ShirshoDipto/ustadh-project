# Geopolicy Insight

This app utilizes Mapbox to provide an interactive and intuitive data visualization map focused on conflict zones and energy supplies around the world. The goal of this app is to assist in understanding and analyzing various global policies by presenting conflict zones, oil pipelines, and gas pipelines around the world in a visually engaging format.

<!-- [View Live](https://shirshodipto.github.io/ustadh-project) -->

![](./dist/gifs/interactiveMap3.webp)

## Technologies Used

- JavaScript
- HTML
- CSS
- Webpack
- [MapboxGL](https://www.mapbox.com)
- [Mapbox Studio](https://www.mapbox.com)

## Key Features

1. **Interactivity:** Explore through an interactive map interface, allowing users to zoom in, pan, tilt, and navigate effortlessly.

2. **Customizable Layers:** Toggle between different layers and sublayers to focus on specific regions of interest.

3. **Rich Information Display:** Access detailed information by interacting with the map elements, such as conflict zone details, summary of the pipelines.

## Data Sources:

Files can be viewed from `/dist/csvFiles` in the repository

- Conflict Zones: https://carto.com
- Oil and Gas Pipelines: https://globalenergymonitor.org

## Methodology

The core of this app is the data files that contain all the coordinates needed for Mapbox Studio to draw on a canvas. The accepted format for the data files is csv or geojson. After downloading the data files in csv format from the aforementioned websites, a one-time Python's [Numpy](https://numpy.org) code is used to edit the files to give them the structure that Mapbox Studio requires.

The data files are then uploaded to Mapbox Studio to create layers and add designs, such as the colors and width of the linestrings, diameter of the red dots, etc. The canvas styles are also chosen from Mapbox Studio: one is Monochrome, which is good for general data visualization purposes, and the other is Satellite view.

Once all the layers are ready, Mapbox GL is installed and connected to the styles created with Mapbox Studio to add further interactivity with JavaScript code.

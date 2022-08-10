# TDIS Damage Plain Downloader

This is the frontend repository for the Texas Damage Plain application. This tool is designed to allow users to
visualize,
search and download images of the Damage Plain.

[//]: # (- Production Site &#40;TACC&#41;: https://tdis-web.tacc.utexas.edu/metadata_app)

[//]: # (- Development Site &#40;TACC&#41;:  https://ms2-dev.tacc.utexas.edu/metadata_app)

- Azure Demo Site: https://tdiscorral.z13.web.core.windows.net/texas_damage_plain/index.html

This is a React-based frontend application, using open layers for the mapping and geoserver to host the WMS and Vector
Tiles.

## Navigating the repository

This repository uses React Router v5 for client-side routing. The main routes component can be found
in [src/components/Main.js](https://github.com/TexasDIS/ms2-metadata-frontend/blob/main/src/components/Main.js).

The `src` directory is split into the following sub-directories:

- `/components` - all React components
- `/data` - json files for direction to wms and mvts
- `/views` - main pages, most edits will be in the Hazards.js

## API

There are three primary spatial APIs this application queries to fetch data, a geoserver WMS Layer to visualize the
[Damage Plain](https://tdis-geoserver.eastus.cloudapp.azure.com/geoserver/Flooding/wms?service=WMS&version=1.1.0&request=GetMap&layers=Flooding%3AdamagePlain%20Oversampled&bbox=-1.196422005872149E7%2C2869375.173692335%2C-1.0370589446057223E7%2C4410483.782851376&width=768&height=742&srs=EPSG%3A3857&styles=&format=application/openlayers)
.
Mapbox Vector Tiles (MVTs) are used to supply the download locations for each clipped raster. Currently, two boundaries
have been generated using Hydrologic Unit
Codes ([HUC-8](https://tdis-geoserver.eastus.cloudapp.azure.com/geoserver/Flooding/wms?service=WMS&version=1.1.0&request=GetMap&layers=Flooding%3AHuc-8&bbox=-1092671.194067343%2C310919.1148527339%2C273823.4742505134%2C1567885.4598421166&width=768&height=706&srs=EPSG%3A5070&styles=&format=application/openlayers)
and [HUC-12](https://tdis-geoserver.eastus.cloudapp.azure.com/geoserver/Flooding/wms?service=WMS&version=1.1.0&request=GetMap&layers=Flooding%3AHuc-12&bbox=-1019492.2564902612%2C266083.1845623863%2C251076.0386061563%2C1527803.064197228&width=768&height=762&srs=EPSG%3A5070&styles=&format=application/openlayers))

MVTs and selections can be editin in
the [MVT.js](https://github.com/TexasDIS/texas_damageplain/blob/main/src/Components/Maps/OL/Layers/MVT.js) file, and the
WMS
layer is loaded
through [OLWMT.js](https://github.com/TexasDIS/texas_damageplain/blob/main/src/Components/Maps/OL/Layers/OLwmts.js).

## Running the application

### Setup & Installation

If this is your first time running the project, run `npm install .` to install all of the necessary dependencies.

### Starting the application

Run `npm start` to start the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it
in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Builds & Deployment

### Creating development & production builds

Development and production builds can be created with `npm run build:dev` and `npm run build:prod` respectively.

[//]: # (### Deployment)

[//]: # ()

[//]: # (For TACC machine deployment instructions, please)

[//]: # (view [this walkthrough document]&#40;https://docs.google.com/document/d/1TVq3HNiFu7YhGaWVGhoTy9rFXxHbJ7zBCls32RsN2dw/edit#&#41;.)

[//]: # (You may need to request access to view this document.)

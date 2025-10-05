// === Bangladesh DEM GeoTIFF (SRTM 30 m) ===
// Change only the lines marked "EDIT".

// -------------------- EDIT: COUNTRY & VIS/EXPORT --------------------
var COUNTRY_NAME   = 'Bangladesh';   // <--- EDIT: country to clip from GAUL
var MIN_ELEV_M     = 0;              // <--- EDIT: display min (m)
var MAX_ELEV_M     = 1052;           // <--- EDIT: display max (m)
var EXPORT_SCALE   = 30;             // <--- EDIT: output resolution (m) ~ SRTM native
var EXPORT_CRS     = 'EPSG:4326';    // <--- EDIT: output CRS 
var DRIVE_FOLDER   = 'EarthEngineExports'; // <--- EDIT: Drive folder name
var FILE_PREFIX    = 'Bangladesh_DEM';     // <--- EDIT: output file prefix
var SHOW_LEGEND    = true;           // <--- EDIT: show simple legend in the Code Editor?

// Optional: custom palette
var PALETTE = [
  '006837','31a354','78c679','c2e699','ffffcc',
  'fed976','fd8d3c','e31a1c','b10026'
];

// -------------------- (Usually OK defaults) -------------------------
var DEM_COLLECTION = 'USGS/SRTMGL1_003';      // SRTM 30 m
var GAUL_LEVEL0    = 'FAO/GAUL/2015/level0';  // Country boundaries

// -------------------- Load data & clip to country -------------------
var dem = ee.Image(DEM_COLLECTION);
var country = ee.FeatureCollection(GAUL_LEVEL0)
  .filter(ee.Filter.eq('ADM0_NAME', COUNTRY_NAME))
  .geometry();

var demClipped = dem.clip(country);

// -------------------- Visualize in the Code Editor -------
var vis = {min: MIN_ELEV_M, max: MAX_ELEV_M, palette: PALETTE};

Map.centerObject(country, 7);
Map.addLayer(demClipped, vis, COUNTRY_NAME + ' DEM (' + MIN_ELEV_M + '–' + MAX_ELEV_M + ' m)');

// -------------------- Quick sanity prints ----------------
print('DEM collection:', DEM_COLLECTION);
print('Country geometry area (km²):', country.area().divide(1e6));

// -------------------- EXPORT GeoTIFF to Google Drive ----------------
Export.image.toDrive({
  image: demClipped,
  description: FILE_PREFIX + '_Export',
  folder: DRIVE_FOLDER,
  fileNamePrefix: FILE_PREFIX,
  region: country,
  scale: EXPORT_SCALE,   // ~30 m
  crs: EXPORT_CRS,       // WGS84 by default
  maxPixels: 1e13
});

// -------------------- Simple legend (Code Editor only) --------------
if (SHOW_LEGEND) {
  var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px'}});
  legend.add(ui.Label('Elevation (m)', {fontWeight: 'bold', margin: '0 0 4px 0'}));

  // horizontal color bar
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0).multiply(0).add(ee.Image.pixelLonLat().select(0)),
    params: {bbox: [0, 0, 1, 0.1], dimensions: '200x10', palette: PALETTE},
    style: {stretch: 'horizontal', height: '10px', margin: '4px 0'}
  });
  legend.add(colorBar);

  legend.add(ui.Panel({
    widgets: [ui.Label(String(MIN_ELEV_M)), ui.Label('', {stretch: 'horizontal'}), ui.Label(String(MAX_ELEV_M))],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {margin: '0'}
  }));
  Map.add(legend);
}

/*
NOTES:
- COUNTRY_NAME: pick any GAUL country string (e.g., 'Bangladesh').
- MIN/MAX_ELEV_M: stretch range for display; export is unaffected by these.
- EXPORT_*: change Drive folder, file prefix, scale (m), and CRS (e.g., 'EPSG:32646' UTM 46N or 'EPSG:32647' UTM 47N for Bangladesh).
- PALETTE: replace with any stepped palette you like.
- SHOW_LEGEND: set to false if exporting headlessly or using the Python API.
*/

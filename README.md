Bangladesh DEM Export (SRTM 30 m, Google Earth Engine)

This repository contains a Google Earth Engine (GEE) script that visualizes the SRTM 30 m Digital Elevation Model (DEM) for Bangladesh, displays a stepped color legend in the map, and exports the result as a GeoTIFF to Google Drive.


---

What the Script Does
- Loads **USGS/SRTMGL1_003** (SRTM 30 m DEM)  
- Loads **FAO/GAUL/2015/level0** country boundaries and clips to **Bangladesh**  
- Visualizes elevation with a stepped color palette  
- Adds an on-map legend (UI panel)  
- Exports a **GeoTIFF** (WGS84, 30 m) to Google Drive  

---

How to Run (Google Earth Engine)
1. Open **[https://code.earthengine.google.com](https://code.earthengine.google.com)**  
2. Create a new script and paste the contents of [`bangladesh_dem_export.js`](bangladesh_dem_export.js)  
3. Modify the variables marked **EDIT** (COUNTRY_NAME, EXPORT options, etc.)  
4. Click **Run** to visualize the DEM and legend  
5. In the **Tasks** panel, click **Run** on the **Export** task (`Bangladesh_DEM_Export`)  
6. The exported GeoTIFF will appear in your Google Drive folder (`EarthEngineExports`)  

---

Editable Parameters
| Parameter | Default | Description |
|------------|----------|-------------|
| `COUNTRY_NAME` | `Bangladesh` | Country name (from FAO GAUL dataset) |
| `MIN_ELEV_M` | `0` | Minimum elevation (m) for visualization |
| `MAX_ELEV_M` | `1052` | Maximum elevation (m) for visualization |
| `EXPORT_SCALE` | `30` | Output resolution (m) |
| `EXPORT_CRS` | `EPSG:4326` | Coordinate reference system (WGS84) |
| `DRIVE_FOLDER` | `EarthEngineExports` | Google Drive export folder |
| `FILE_PREFIX` | `Bangladesh_DEM` | Prefix for exported GeoTIFF |
| `SHOW_LEGEND` | `true` | Toggle legend visibility in map UI |



Notes & Tips
- For projected output, use UTM zones: `EPSG:32646` (West) or `EPSG:32647` (East).  
- Legend is for visualization only; exported values remain in meters.  
- You can swap the palette with any stepped ramp (e.g., “terrain” or “viridis”).  
- To adapt this script to other countries, just edit `COUNTRY_NAME` and update the export filename.

---

Data Sources
- **DEM:** `USGS/SRTMGL1_003` (NASA/USGS SRTM, 30 m)  
- **Boundary:** `FAO/GAUL/2015/level0` (FAO GAUL database)

---

Author
**Md Ali Ahnaf Abid Mayukh**  
Department of Civil & Environmental Engineering  
Islamic University of Technology (IUT), Bangladesh  

---

## 🔒 License
Released under the **MIT License**. See [LICENSE](LICENSE).

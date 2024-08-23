mapboxgl.accessToken = 'pk.eyJ1IjoiaGFrYWkiLCJhIjoiY20wN2I1cGphMGRpajJsb3EyemY5N2ZvZCJ9.Nt0Y2uUdc1GcVKooqO7n2Q';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v9',
  projection: 'mercator',
  zoom: 9,
  center: [-125.27, 51.32],
  pitch: 60,
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
  map.setFog({});
});

map.on('load', () => {
  // Add DEM source
  map.addSource('dem', {
    type: 'raster-dem',
    tiles: [
      'https://goose.hakai.org/titiler/cog/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?url=https%3A%2F%2Fpublic-aco-data.s3.amazonaws.com%2F4018_MtWaddington%2F23_4018_01_MtWaddington_DTM_1m_WGS84_UTM10_Ellips_cog.tif&bidx=1&rescale=-10%2C4000'
    ],
    tileSize: 512
  });

  // Add terrain layer
  map.setTerrain({ source: 'dem', exaggeration: 0.002 });

  // Add ortho source
  map.addSource('ortho', {
    type: 'raster',
    tiles: [
      'https://goose.hakai.org/titiler/cog/tiles/WebMercatorQuad/{z}/{x}/{y}?url=https://public-aco-data.s3.amazonaws.com/4018_MtWaddington/23_4018_01_MtWaddington_ORTHO_WGS84_UTM10_Ellips_cog.tif&bidx=1&bidx=2&bidx=3'
    ],
    tileSize: 512
  });

  // Add ortho layer
  map.addLayer({
    id: 'ortho-image',
    source: 'ortho',
    type: 'raster',
  });

  // Add sky layer for better 3D effect
  map.addLayer({
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 90.0],
      'sky-atmosphere-sun-intensity': 15
    }
  });
});

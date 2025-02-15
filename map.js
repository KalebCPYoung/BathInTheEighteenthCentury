export function createMap(containerId) {
	const map = L.map(containerId).setView([51.3810, -2.3590], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	fetch('maps/map1085.tif')
	.then(response => response.arrayBuffer())  // Convert the response to ArrayBuffer
	.then(data => {
			// Create a GeoRaster instance from the ArrayBuffer
			const geoRaster = new GeoRaster(data);

			// Create the GeoRasterLayer with the GeoRaster data
			const geoRasterLayer = new GeoRasterLayer({
					georaster: geoRaster,
					opacity: 0.8
			});

			// Add the GeoRasterLayer to the map
			geoRasterLayer.addTo(map);
	})
	.catch(error => {
			console.error('Error loading GeoTIFF:', error);
	});
	
	map.dragging.enable();
	map.scrollWheelZoom.enable();
	map.setMinZoom(13);
	map.setMaxZoom(18);
	return map;
}

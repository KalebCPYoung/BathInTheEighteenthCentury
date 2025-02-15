export function createMap(containerId) {
	const map = L.map(containerId).setView([51.3810, -2.3590], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	var map1735 = L.imageOverlay("map1735.png",[51.386482,-2.378191], [52.386482,-1.378191]);
	map1735.addTo(map);
	map.dragging.enable();
	map.scrollWheelZoom.enable();
	map.setMinZoom(13);
	map.setMaxZoom(18);
	return map;
}

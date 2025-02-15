export function createMap(containerId) {
	let app = new PIXI.Application({
		width: 800,
		height: 800,
		backgroundColor: 0x1099bb
	});

	document.getElementById(containerId).appendChild(app.view);

	// Load Maps
	let map1 = PIXI.Texture.from('maps/map1-nm.png');
	let mapSprite = new PIXI.Sprite(map1);

	let mapoverlay = PIXI.Texture.from('maps/mapoverlay.svg');
	let mapoverlaySprite = new PIXI.Sprite(mapoverlay);

	//Create Map Element
	mapoverlaySprite.anchor.set(0.5);
	mapoverlaySprite.x = app.screen.width / 2;
	mapoverlaySprite.y = app.screen.height / 2;
	mapoverlaySprite.scale.set(0.2);

	mapSprite.anchor.set(0.5);
	mapSprite.x = app.screen.width / 2;  // Center map
	mapSprite.y = app.screen.height / 2; // Center map
	mapSprite.scale.set(0.2);
	mapSprite.interactive = true;  // Enable interactivity for dragging
	mapSprite.buttonMode = true;   // Change cursor to pointer when hovering

	app.stage.addChild(mapSprite);
	app.stage.addChild(mapoverlaySprite);



	// Constants for zoom
	const minScale = 0.2;
	const maxScale = 3.0;

	////////////////
	/// Dragging ///
	////////////////
	let dragging = false;
	let previousPosition = { x: 0, y: 0 };
	let prevPositionX = 0;
	let prevPositionY = 0;

	// Start dragging
	mapSprite.on('pointerdown', (event) => {
		dragging = true;
		prevPositionX = event.data.global.x;
		prevPositionY = event.data.global.y;
	});

	// Move map while dragging
	mapSprite.on('pointermove', (event) => {
		if (dragging) {
			let newPositionX = event.data.global.x;
			let newPositionY = event.data.global.y;
			mapSprite.x += (newPositionX - prevPositionX);
			mapSprite.y += (newPositionY - prevPositionY);
			prevPositionX = newPositionX;
			prevPositionY = newPositionY;
		}
		else return;
	});

	// Stop dragging when the mouse is released
	mapSprite.on('pointerup', () => dragging = false);
	mapSprite.on('pointerupoutside', () => dragging = false);

	// Listen for the mouse wheel event to enable zooming
	app.view.addEventListener('wheel', (event) => {
		event.preventDefault(); // Prevent the default scroll behavior

		// Determine the zoom factor based on the wheel delta
		let zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

		// Calculate new scale while respecting our limits
		let newScale = mapSprite.scale.x * zoomFactor;
		if (newScale > maxScale) newScale = maxScale;
		if (newScale < minScale) newScale = minScale;
		// Apply the new scale uniformly to both axes
		mapSprite.scale.set(newScale);
	}, { passive: false });

	return app;
}

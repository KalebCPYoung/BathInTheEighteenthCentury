export function createMap(containerId) {
	let app = new PIXI.Application({
		width: 800,
		height: 800,
		backgroundColor: 0x1099bb
	});

	// Append the canvas to the container
	document.getElementById(containerId).appendChild(app.view);
  
	//Load assests
	let map1 = PIXI.Texture.from('maps/map1-nm.png');
	let mapSprite = new PIXI.Sprite(map1);
  
	mapSprite.anchor.set(0.5);
	mapSprite.x = app.screen.width;
	mapSprite.y = app.screen.height;
	app.stage.addChild(mapSprite);
  
	// Constants
	const minScale = 0.15;
	const maxScale = 3.0;
    	let dragging = false;
	let previousPosition = { x: 0, y: 0 };
	
	// Start dragging
	mapSprite.on('pointerdown', (event) => {
	  dragging = true;
	  previousPosition = event.data.global;
	});
	
	// Move map while dragging
	mapSprite.on('pointermove', (event) => {
	  if (!dragging) return;
	
	  let newPosition = event.data.global;
	  mapSprite.x += newPosition.x - previousPosition.x;
	  mapSprite.y += newPosition.y - previousPosition.y;
	  previousPosition = newPosition;
	});
	
	// Stop dragging when the mouse is released
	mapSprite.on('pointerup', () => dragging = false);
	mapSprite.on('pointerupoutside', () => dragging = false);
	
	// Listen for the mouse wheel event to enable zooming
	app.view.addEventListener('wheel', (event) => {
		event.preventDefault(); // Prevent the default scroll behavior

		// Determine the zoom factor based on the wheel delta
		var zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

		// Calculate new scale while respecting our limits
		let newScale = mapSprite.scale.x * zoomFactor;
		if (newScale > maxScale) newScale = maxScale;
		if (newScale < minScale) newScale = minScale;

		// Apply the new scale uniformly to both axes
		mapSprite.scale.set(newScale);
	}, { passive: false });

  return app;
}

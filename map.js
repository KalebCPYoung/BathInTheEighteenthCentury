export function createMap(containerId) {
  let app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
  });

  // Append the canvas to the container
  document.getElementById(containerId).appendChild(app.view);
  
  //Load map
  let map1 = PIXI.Texture.from('maps/map1-nm.png');
  let mapSprite = new PIXI.Sprite(map1);
  mapSprite.anchor.set(0.5);
  mapSprite.x = app.screen.width / 2;
  mapSprite.y = app.screen.height / 2;
  app.stage.addChild(mapSprite);
  
  return app;
}
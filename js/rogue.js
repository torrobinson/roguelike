window.onload = function init() {
  var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x1099bb});
  document.body.appendChild(renderer.view);

  var stage = new PIXI.Container();

  var basicText = new PIXI.Text('Test');
  basicText.x = 10;
  basicText.y = 10;

  stage.addChild(basicText);

  renderer.render(stage);
}

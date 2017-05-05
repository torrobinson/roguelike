class PixiRenderer extends Renderer{
    init(){
        this.tileSize = 16;
        // Set up Pixi and attach to the canvas
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width * this.tileSize, this.height * this.tileSize, {backgroundColor : 0x1c1c1c});
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();
        this.terrainAtlas = PIXI.loader.resources['terrainAtlas'].textures;
        this.characterAtlas = PIXI.loader.resources['characterAtlas'].textures;
    }
    drawFrame(world,centerPoint){
        // Clear frame
        for (var i = this.pixiStage.children.length - 1; i >= 0; i--) {	this.pixiStage.removeChild(this.pixiStage.children[i]);};

        // Center the camera
        var layersToRender = Rendering.SliceLayersToSize(
            this.game,        // game reference
            world.layers,     // layer stack to render
            centerPoint,      // Center of viewport. Usually the player.
            this.width,       // Width of viewport
            this.height       // Height of viewport
          );

        // Order it by z-index ascending
         layersToRender =layersToRender.sort(function(layer1, layer2){return layer1.zIndex - layer2.zIndex});


        for(var l=0; l<layersToRender.length; l++){
              var layer = layersToRender[l];
              var layerContainer = new PIXI.Container();
              for(var y=0;y<this.height;y++){
                  for(var x=0;x<this.width;x++){
                    if(layer.getTile(x,y) !== undefined && layer.getTile(x,y) !== null){
                        var actor = layer.getTile(x,y);
                        var actorSprite = actor.getSprite();
                        if(actorSprite !== null){

                            var atlas = null;
                            if(actor instanceof Player || actor instanceof Chaser){
                                atlas = this.characterAtlas;
                            }
                            else{

                                atlas = this.terrainAtlas;
                            }
                            var sprite = new PIXI.Sprite(atlas[actorSprite.spriteName]);
                            sprite.x = 0 + (x * this.tileSize);
                            sprite.y = 0 + (y * this.tileSize);
                            layerContainer.addChild(sprite);
                        }
                    }

                  }
            }
            this.pixiStage.addChild(layerContainer);
        }

        // Render the frame
        this.pixiRenderer.render(this.pixiStage);
    }
}

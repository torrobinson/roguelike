class PixiRenderer extends Renderer{
    init(){
        this.tileSize = 16;
        // Set up Pixi and attach to the canvas
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width * this.tileSize, this.height * this.tileSize, {backgroundColor : 0x1c1c1c});
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();
        this.terrainAtlas = PIXI.loader.resources['terrainAtlas'].textures;
        this.characterAtlas = PIXI.loader.resources['characterAtlas'].textures;

        this.pixiStage.interactive = true;

        this.renderedLayers = null;

        var self = this;
        this.pixiStage.on('click', function(e){
            // Screen pixels
            var x = e.data.global.x;
            var y = e.data.global.y;

            // Screen tile pixels
            x = Math.floor(x/self.tileSize);
            y = Math.floor(y/self.tileSize);

            if(self.renderedLayers !== null){
                // Get the topmost non-null actor at this location
                var actorClicked = self.renderedLayers.filter(function(layer){
                    return layer.getTile(x,y) !== null;
                }).sort(function(layer1, layer2){
                    return layer2.zIndex - layer1.zIndex;
                }).first().getTile(x,y);

                if(actorClicked != null){
                    var game = self.game;
                    var player = self.game.player;
                    // Clicked an actor
                    if(actorClicked instanceof Floor){
                        var command = new MoveTo(
                              player,
                              actorClicked.location
                          );
                          if(player.currentCommand !== null){
                              // Retarget the player
                              player.interruptWithCommand(command);
                          }
                          else{
                              player.addCommand(command);
                          }

                          var totalTicks = player.currentCommand.actions.length+1;
                          var ticks = 0;
                          var timer = setInterval(function(){
                                      game.gameTick(game);
                                      ticks++;

                                      if(ticks === totalTicks){
                                          clearInterval(timer);
                                      }
                                },110);

                    }

                }

            }

        });
    }

    fogSprite(sprite, fogged, fogStyle){
        if(fogStyle === FogStyle.Hide){
            sprite.visible = !fogged;
        }
        if(fogStyle === FogStyle.Darken){
            sprite.tint = fogged ? 0x2B2B2B : 0xFFFFFF;
        }
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
         this.renderedLayers = layersToRender;

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

                            this.fogSprite(sprite, actor.fogged, actor.fogStyle);

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

class PixiRenderer extends Renderer{
    init(){
        this.tileSize = 16;
        // Set up Pixi and attach to the canvas
        this.infoBar = {
            width: this.width * this.tileSize,
            height: 40,
        };
        this.pixelWidth = this.width * this.tileSize;
        this.pixelHeight = (this.height * this.tileSize) + this.infoBar.height;
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width * this.tileSize, (this.height * this.tileSize) + this.infoBar.height, {backgroundColor : 0x1c1c1c});
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();
        this.terrainAtlas = PIXI.loader.resources['terrainAtlas'].textures;
        this.characterAtlas = PIXI.loader.resources['characterAtlas'].textures;

        this.pixiStage.interactive = true;

        this.renderedLayers = null;
    }

    fogSprite(sprite, fogged, fogStyle){
        if(fogStyle === FogStyle.Hide){
            sprite.visible = !fogged;
        }
        if(fogStyle === FogStyle.Darken){
            sprite.tint = fogged ? 0x2B2B2B : 0xFFFFFF;
        }
    }

    getInventoryText(){
        var text = '';
        var inv = this.game.player.inventory.map(function(inv){return inv.name});

        var itemCounts = [];

        var counts = inv.reduce(function(countMap, word) {countMap[word] = ++countMap[word] || 1;return countMap}, {});
        for(var item in counts) {
            if (counts.hasOwnProperty(item)) {
                itemCounts.push(item + ' x ' + counts[item]);
            }
        }
        return itemCounts.join(', ');
    }

    drawMenu(menu){
        var breadcrumb = menu.navStack.map(function(page){return page.name}).reverse().join(' / ');
        var text = '';

        text += breadcrumb + '\r\n';
        text += '-'.repeat(breadcrumb.length)  + '\r\n';

        // Render current page
        var page = menu.currentPage();
        for(var o=0; o<page.options.length; o++){
          var option = page.options[o];
          if(menu.selectedOptionIndex === o){
            text+='->' + option.label;
          }
          else{
            text+='  ' + option.label;
          }
          text+='\r\n';
        }

        var style = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 20,
            fill:  0xFFFFFF,
            wordWrap: true,
            wordWrapWidth: 440
        });

        var menuText = new PIXI.Text(text, style);
        menuText.x = 0;
        menuText.y = 0;

        var pauseOverlay = new PIXI.Graphics();
        pauseOverlay.beginFill(0x000000,0.5);
        pauseOverlay.drawRect(0, 0, this.pixelWidth, this.pixelHeight);
        pauseOverlay.endFill();

        this.pixiStage.addChild(pauseOverlay);
        this.pixiStage.addChild(menuText);
    }

    drawInfoBar(){
        var writeLocation = new Point(0, this.height * this.tileSize);
        var text = 'Health: ' + this.game.player.health + '\r\n'
                    + this.game.getLastLog() + '\r\n'
                    + 'Inventory:' + this.getInventoryText();


        var style = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 10,
            fill:  0xFFFFFF,
            wordWrap: true,
            wordWrapWidth: 440
        });

        var pixiText = new PIXI.Text(text, style);
        pixiText.x = writeLocation.x;
        pixiText.y = writeLocation.y;
        this.pixiStage.addChild(pixiText);
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

        // Draw some live game info
        this.drawInfoBar();

        // Draw a menu if we're paused
        if(this.game.state === GameState.Paused){
          this.drawMenu(this.game.menu);
        }

        // Render the frame
        this.pixiRenderer.render(this.pixiStage);
    }
}

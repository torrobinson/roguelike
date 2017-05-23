/// <reference path="../Helpers/Generic.ts" />
declare var PIXI: any;

class PixiRenderer implements Renderer {

    canvas: any;
    width: number;
    height: number;
    game: Game;

    tileSize: number;
    scale: number;
    pixelWidth: number;
    pixelHeight: number;



    // Pixi Containers
    pixiRenderer: any;

    healthGraphics: any[];

    guiHorizontalContainer: any = new PIXI.Container(); // master bottom bar
    horizontalContainerHeight: number = 200;
    guiLogContainer:any = new PIXI.Container();         // game log

    guiVerticalContainer: any = new PIXI.Container();   // master side bar
    verticalContainerWidth: number = 200;
    guiEquipContainer: any = new PIXI.Container();      // equipment
    guiBarsContainer: any = new PIXI.Container();       // health, XP
    guiStatsContainer: any = new PIXI.Container();      // AP, HP, etc
    guiEffectsContainer: any = new PIXI.Container();    // buffs/debuffs
    guiOverlayContainer: any = new PIXI.Container();    // overlays like health bars
    stageContainer: any  = new PIXI.Container();   // the actual game actors
    guiPad: number = 5;

    constructor(canvas: any, width: number, height: number) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.game = null;
    }

    init() {
        this.tileSize = 16;
        this.scale = 1;
        // Set up Pixi and attach to the canvas
        this.pixelWidth = (this.width * this.tileSize) + this.verticalContainerWidth;
        this.pixelHeight = (this.height * this.tileSize) + this.horizontalContainerHeight;
        PIXI.RESOLUTION = this.scale;
        this.pixiRenderer = PIXI.autoDetectRenderer((this.width * this.tileSize + this.verticalContainerWidth) * this.scale, ((this.height * this.tileSize) + this.horizontalContainerHeight) * this.scale, { backgroundColor: ColorCode.Black });
        this.canvas.appendChild(this.pixiRenderer.view);

        this.stageContainer.interactive = true;

        this.healthGraphics = [];
    }

    guiGetStatsContainer(forActor: Actor, barHeight: number){
      var yOffset = -3;
      var healthStyle = new PIXI.TextStyle({
          fontFamily: 'monospace',
          fontSize: 10,
          fill: ColorCode.White,
          align: 'center'
      });
      var barTotalWidth = this.verticalContainerWidth -  this.guiPad * 2;
      var health = 'HP: ' + forActor.health + ' / ' + forActor.maxHealth() + Generic.NewLine() +
      '(' + forActor.startingHealth + ' + ' + forActor.getMaxHealthBuff() + ')';
      var healthText = new PIXI.Text(health, healthStyle);
      var healthWidth = (forActor.health / forActor.maxHealth()) * barTotalWidth;



      var experienceStyle = new PIXI.TextStyle({
          fontFamily: 'monospace',
          fontSize: 10,
          fill: ColorCode.White,
          align: 'center'
      });
      var experience = 'Level ' + forActor.level + Generic.NewLine() +
      '(' + forActor.currentLevelXP + ' / ' + forActor.xpNeeded + ')';
      var experienceText = new PIXI.Text(experience, experienceStyle);
      var experiencehWidth = (forActor.currentLevelXP / forActor.xpNeeded) * barTotalWidth;



      // Relative to this stats container, not the entire screen
      var drawX = this.guiPad;
      var drawY = this.guiPad;
      var barPadding = 0;

      var healthLocation = new Point(this.verticalContainerWidth/2 - healthText.width/2, drawY + barHeight/2 - healthText.height/2 + yOffset);
      healthText.x = healthLocation.x;
      healthText.y = healthLocation.y;
      var healthBarGraphic = new PIXI.Graphics();
      healthBarGraphic.beginFill(ColorCode.DarkRed, 1);
      healthBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
      healthBarGraphic.endFill();
      healthBarGraphic.beginFill(ColorCode.Red, 1);
      healthBarGraphic.drawRect(drawX, drawY, healthWidth, barHeight + barPadding - this.guiPad);
      healthBarGraphic.endFill();

      drawY += barHeight + barPadding;

      var experienceLocation = new Point(this.verticalContainerWidth/2 - experienceText.width/2, drawY + barHeight/2 - experienceText.height/2 + yOffset);
      experienceText.x = experienceLocation.x;
      experienceText.y = experienceLocation.y;
      var experienceBarGraphic = new PIXI.Graphics();
      experienceBarGraphic.beginFill(ColorCode.DarkPurple, 1);
      experienceBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
      experienceBarGraphic.endFill();
      experienceBarGraphic.beginFill(ColorCode.Purple, 1);
      experienceBarGraphic.drawRect(drawX, drawY, experiencehWidth, barHeight + barPadding - this.guiPad);
      experienceBarGraphic.endFill();

      var statsContainer = new PIXI.Container();
      statsContainer.addChild(healthBarGraphic);
      statsContainer.addChild(healthText);
      statsContainer.addChild(experienceBarGraphic);
      statsContainer.addChild(experienceText);

      return statsContainer;
    }

    guiGetEquipMapContainer(scale: number, paddingBetweenSlots: number){
          // Draw the definition of a 'slot'
					var slotGraphic = new PIXI.Graphics();
					var size = this.tileSize * scale;
					var padding = paddingBetweenSlots;
					var iterations = size/4;
					var startAlpha = 0.75;
					for(var i=0; i<iterations; i++){
						slotGraphic.lineStyle(1, ColorCode.White, Math.max(startAlpha-(i/iterations),0))
						slotGraphic.drawRect(i, i, size-i*2, size-i*2)
					}


					// Create a texture out of it
					var slotTexture = new PIXI.RenderTexture(this.pixiRenderer, size, size);
					slotTexture.render(slotGraphic);

					// Create our sprites based on the slot sprite
					var headSlot = new PIXI.Sprite(slotTexture);
					var torsoSlot = new PIXI.Sprite(slotTexture);
					var legSlot = new PIXI.Sprite(slotTexture);
					var footSlot = new PIXI.Sprite(slotTexture);
					var handSlot = new PIXI.Sprite(slotTexture);
					var weaponSlot = new PIXI.Sprite(slotTexture);

          var atlas = PIXI.loader.resources.itemAtlas.textures;
          if(this.game.player.equippedHead){
            var headItem = new PIXI.Sprite(atlas[this.game.player.equippedHead.getSprite().spriteName]);
              headItem.scale.x = scale;
              headItem.scale.y = scale;
          }
          if(this.game.player.equippedTorso){
            var torsoItem = new PIXI.Sprite(atlas[this.game.player.equippedTorso.getSprite().spriteName]);
              torsoItem.scale.x = scale;
              torsoItem.scale.y = scale;
          }
          if(this.game.player.equippedLegs){
            var legItem = new PIXI.Sprite(atlas[this.game.player.equippedLegs.getSprite().spriteName]);
              legItem.scale.x = scale;
              legItem.scale.y = scale;
          }
          if(this.game.player.equippedFeet){
            var footItem = new PIXI.Sprite(atlas[this.game.player.equippedFeet.getSprite().spriteName]);
              footItem.scale.x = scale;
              footItem.scale.y = scale;
          }
          if(this.game.player.equippedHands){
            var handItem = new PIXI.Sprite(atlas[this.game.player.equippedHands.getSprite().spriteName]);
              handItem.scale.x = scale;
              handItem.scale.y = scale;
          }
          if(this.game.player.equippedWeapon){
              var weaponItem = new PIXI.Sprite(atlas[this.game.player.equippedWeapon.getSprite().spriteName]);
              weaponItem.scale.x = scale;
              weaponItem.scale.y = scale;
          }

					// Create a container for place teh equip slots in
					var equipContainer = new PIXI.Container();

					var slotX = size + padding;
					var slotY = 0;

					// Vertical
					headSlot.x = slotX;
					headSlot.y = slotY;
					equipContainer.addChild(headSlot);
          if(this.game.player.equippedHead){
            headItem.x = slotX;
  					headItem.y = slotY;
  					equipContainer.addChild(headItem);
          }
					slotY+=size+padding;

					torsoSlot.x = slotX;
					torsoSlot.y = slotY;
					equipContainer.addChild(torsoSlot);
          if(this.game.player.equippedTorso){
            torsoItem.x = slotX;
  					torsoItem.y = slotY;
  					equipContainer.addChild(torsoItem);
          }
					slotY+=size+padding;

					legSlot.x = slotX;
					legSlot.y = slotY;
					equipContainer.addChild(legSlot);
          if(this.game.player.equippedLegs){
            legItem.x = slotX;
  					legItem.y = slotY;
  					equipContainer.addChild(legItem);
          }
					slotY+=size+padding;

					footSlot.x = slotX;
					footSlot.y = slotY;
					equipContainer.addChild(footSlot);
          if(this.game.player.equippedFeet){
            footItem.x = slotX;
  					footItem.y = slotY;
  					equipContainer.addChild(footItem);
          }


					// Horizontal
					slotX = 0;
					slotY = size + padding;

					handSlot.x = slotX;
					handSlot.y = slotY;
					equipContainer.addChild(handSlot);
          if(this.game.player.equippedHands){
            handItem.x = slotX;
  					handItem.y = slotY;
  					equipContainer.addChild(handItem);
          }
					slotX+=(size+padding) * 2;

					weaponSlot.x = slotX;
					weaponSlot.y = slotY;
					equipContainer.addChild(weaponSlot);
          if(this.game.player.equippedWeapon){
            weaponItem.x = slotX;
  					weaponItem.y = slotY;
  					equipContainer.addChild(weaponItem);
          }

          return equipContainer;
    }

    guiGetLogContainer(logCount: number){
      var container = new PIXI.Container();

      container.height = this.horizontalContainerHeight;
      container.width = this.pixelWidth;

      var background = new PIXI.Graphics();
      background.beginFill(ColorCode.DarkerGrey, 1);
      background.drawRect(0,0, this.pixelWidth, this.horizontalContainerHeight);
      background.endFill();
      container.addChild(background);

      var log: LogMessage[] = this.game.getLastLog(logCount);
      var fontFamily = 'Courier';
      var fontSize = 12;
      var logLocation = new Point(0, 0);
      for (let m = 0; m < log.length; m++) {
          var logMessage: LogMessage = log[m];
          var logStyle = new PIXI.TextStyle({
              fontFamily: fontFamily,
              fontSize: fontSize,
              fill: logMessage.color
          });

          // Write the message to the screen
          var logText = new PIXI.Text(logMessage.message, logStyle);
          logText.x = logLocation.x;
          logText.y = logLocation.y;
          container.addChild(logText);
          logLocation.y += fontSize;
      }

      return container;
    }

    getInventoryText() {
        var text = '';
        var inv = this.game.player.inventory.map(function(inv) { return inv.getName() });

        var itemCounts = [];

        var counts = inv.reduce((countMap, word) => { countMap[word] = ++countMap[word] || 1; return countMap }, {});
        for (var item in counts) {
            if (counts.hasOwnProperty(item)) {
                itemCounts.push(item + ' x ' + counts[item]);
            }
        }
        return itemCounts.join(', ');
    }

    drawMenu(menu: Menu) {
        var breadcrumb = menu.navStack.map(function(page) { return page.name }).reverse().join(' / ');
        var text = '';

        text += breadcrumb + Generic.NewLine();
        text += '-'.repeat(breadcrumb.length) + Generic.NewLine();

        // Render current page;
        var options = Generic.ResolveIfDynamic(menu.currentPage().options);
        for (var o = 0; o < options.length; o++) {
            var option = options[o];
            var label = Generic.ResolveIfDynamic(option.label);
            if (option.visible === undefined || (typeof option.visible == 'function' && option.visible())) {
                if (menu.selectedOptionIndex === o) {
                    text += '->' + label;
                }
                else {
                    text += '  ' + label;
                }
                text += Generic.NewLine();
            }
        }

        var style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 11,
            fill: ColorCode.White,
            wordWrap: true,
            wordWrapWidth: 440
        });

        var menuText = new PIXI.Text(text, style);
        // Set the center of the text to be the middle of the canvas
        menuText.x = Math.floor(this.pixiRenderer.width / 2 - menuText.width / 2);
        menuText.y = Math.floor(this.pixiRenderer.height / 2 - menuText.height / 2);

        var pauseOverlay = new PIXI.Graphics();
        pauseOverlay.beginFill(ColorCode.Black, 0.5);
        pauseOverlay.drawRect(0, 0, this.pixelWidth, this.pixelHeight);
        pauseOverlay.endFill();

        // Draw the overlay
        this.stageContainer.addChild(pauseOverlay);

        // Draw the menu on top
        this.stageContainer.addChild(menuText);
    }

    // drawInfoBar() {
    //     var newLine = '\r\n';
    //     var writeLocation = new Point(0, this.height * this.tileSize);
    //     var text = 'Health: ' + this.game.player.health + '/' + this.game.player.maxHealth() + ' | Kills: ' + this.game.player.runStats.kills + ' | Level: ' + this.game.player.level + newLine
    //         + "Gold: " + this.game.player.gold + ' |    Buffs: ' + (this.game.player.buffs.length ? (this.game.player.buffs.first().getDescription()) : '')
    //         + newLine + 'XP: ' + this.game.player.currentLevelXP + '/' + this.game.player.xpNeeded + '(' + this.game.player.totalXP + ')'
    //         ;
    //
    //     var style = new PIXI.TextStyle({
    //         fontFamily: 'Courier',
    //         fontSize: 11,
    //         fill: ColorCode.White,
    //     });
    //
    //     var pixiText = new PIXI.Text(text, style);
    //     pixiText.x = writeLocation.x;
    //     pixiText.y = writeLocation.y;
    //     this.stageContainer.addChild(pixiText);
    //
    //     // Render armor
    //     var armors: Armor[] = this.game.player.getArmor();
    //     let armorX = this.pixelWidth - this.tileSize;
    //     let armorY = this.pixelHeight - this.infoBar.height;
    //     for (let a = 0; a < armors.length; a++) {
    //         var armor = armors[a];
    //         var atlas = PIXI.loader.resources.itemAtlas.textures;
    //         var sprite = new PIXI.Sprite(atlas[armor.getSprite().spriteName]);
    //         sprite.x = armorX;
    //         sprite.y = armorY;
    //         this.stageContainer.addChild(sprite);
    //         armorX -= this.tileSize;
    //     }
    //
    //     // Render potions in inventory (for debugging)
    //     var potions: Potion[] = <Potion[]>this.game.player.getInventoryOfType(Potion);
    //     let potionX = this.pixelWidth - this.tileSize;
    //     let potionY = this.pixelHeight - this.infoBar.height + this.tileSize;
    //     for (let p = 0; p < potions.length; p++) {
    //         var potion = potions[p];
    //         var atlas = PIXI.loader.resources.itemAtlas.textures;
    //         if (potion.getSprite() !== undefined && potion.getSprite() !== null) {
    //             var sprite = new PIXI.Sprite(atlas[potion.getSprite().spriteName]);
    //             sprite.x = potionX;
    //             sprite.y = potionY;
    //             this.stageContainer.addChild(sprite);
    //             potionX -= this.tileSize;
    //         }
    //     }
    //
    // }

    getHealthGraphic(actor: Actor, x: number, y: number) {
        if (actor.health !== undefined) {
            var percentDecimal = (actor.health / actor.maxHealth());

            var maxPipCount = 20;


            var pipsToDraw = Math.ceil(maxPipCount * percentDecimal);
            var heartPipWidth = 2;
            var heartPipHeight = 2;
            var spacingBetweenPips = 0;
            var offsetAboveActor = 5;


            var totalHeight = heartPipHeight;
            var totalWidth = (maxPipCount * heartPipWidth) + ((maxPipCount - 1) * spacingBetweenPips);

            // Offset the pen
            x += (this.tileSize / 2); // move halfway in to the center
            x -= totalWidth / 2; // then move halfway out to it before drawing so that the whole thing is centered
            y -= offsetAboveActor; // move up above the actor

            var healthGraphic = new PIXI.Graphics();
            for (var i = 0; i < maxPipCount; i++) {
                if (i <= pipsToDraw - 1) {
                    // Health they have
                    healthGraphic.beginFill(
                        Color.shadeBlendInt(percentDecimal, ColorCode.Red, ColorCode.Green),
                        1
                    );
                }
                else {
                    // Potential Health
                    healthGraphic.beginFill(ColorCode.DarkRed, 1);
                }

                healthGraphic.drawRect(x, y, heartPipWidth, heartPipHeight);
                healthGraphic.endFill();
                x += heartPipWidth + spacingBetweenPips;
            }
            return healthGraphic;
        }
        return null;
    }

    getMiniMapGraphics(world: World) {
        var offsetX = 20;
        var offsetY = 20;

        var mapAlpha = this.game.settings.minimap.opacity;

        // Draw the floor as white
        var pixelSize = this.game.settings.minimap.size;

        var graphics = new PIXI.Graphics();
        var floorLayer = world.getLayersOfType(LayerType.Floor).first();
        for (var y = 0; y < floorLayer.tiles.length; y++) {
            for (var x = 0; x < floorLayer.tiles[y].length; x++) {
                var tile = floorLayer.tiles[y][x];
                if (tile !== null && tile.fogged === false) {
                    graphics.beginFill(ColorCode.White, mapAlpha);
                    graphics.drawRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }
        }

        // Draw any found actors on the wall layer
        var wallLayer = world.getLayersOfType(LayerType.Wall).first();
        for (var y = 0; y < wallLayer.tiles.length; y++) {
            for (var x = 0; x < wallLayer.tiles[y].length; x++) {
                var tile = wallLayer.tiles[y][x];
                if (tile !== null && tile.fogged === false) {

                    if (tile instanceof StairsDown) {
                        graphics.beginFill(ColorCode.Green, 1);
                        graphics.drawRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                    }

                }
            }
        }

        // Draw player location
        graphics.beginFill(ColorCode.Red, 1);
        graphics.drawRect(this.game.player.location.x * pixelSize, this.game.player.location.y * pixelSize, pixelSize, pixelSize);

        // Draw a border to show map bounds
        graphics.beginFill(ColorCode.White, 0);
        graphics.lineStyle(1, ColorCode.White, mapAlpha);
        graphics.drawRect(0, 0, world.width * pixelSize, world.height * pixelSize);

        graphics.endFill();
        return graphics;
    }

    clearContainer(container: any){
        for (var i = container.children.length - 1; i >= 0; i--) { container.removeChild(container.children[i]); };
    }

    drawFrame(world: World, centerPoint: Point) {
        // Clear frame
        this.clearContainer(this.stageContainer);

        // Clear all Containers
        this.clearContainer(this.guiHorizontalContainer);
        this.clearContainer(this.guiLogContainer);
        this.clearContainer(this.guiVerticalContainer);
        this.clearContainer(this.guiEquipContainer);
        this.clearContainer(this.guiBarsContainer);
        this.clearContainer(this.guiStatsContainer);
        this.clearContainer(this.guiEffectsContainer);
        this.clearContainer(this.guiOverlayContainer);

        // Get things that emit light
        var lightLayer = world.getLayersOfType(LayerType.Wall).first();
        var lights: Torch[] = new Array<Torch>();
        for (var y = 0; y < lightLayer.height; y++) {
            for (var x = 0; x < lightLayer.width; x++) {
                var actor = lightLayer.tiles[y][x];
                if (actor !== null && actor instanceof Torch) {
                    lights.push(actor);
                }
            }
        }

        // Center the camera
        var layersToRender = Rendering.SliceLayersToSize(
            this.game,        // game reference
            world.layers,     // layer stack to render
            centerPoint,      // Center of viewport. Usually the player.
            this.width,       // Width of viewport
            this.height       // Height of viewport
        );

        // Order it by z-index ascending
        layersToRender = layersToRender.sort(function(layer1: Layer, layer2: Layer) { return layer1.zIndex - layer2.zIndex });

        for (var l = 0; l < layersToRender.length; l++) {
            var layer = layersToRender[l];
            var layerContainer = new PIXI.Container();
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (layer.getTile(x, y) !== undefined && layer.getTile(x, y) !== null) {
                        var actor = layer.getTile(x, y);

                        // Note: call the below only once, as returning the sprite also increments
                        //    the frame number. Calling it elsewhere on the same frame draw per sprite
                        //    will cause lost frames
                        var actorSprite = actor.getSprite();


                        if (actorSprite !== undefined && actorSprite !== null) {
                            // Come up with the sprite to draw
                            var atlas = null;

                            // Characters
                            if (actor instanceof Player || actor instanceof Chaser) {
                                atlas = PIXI.loader.resources.characterAtlas.textures;
                            }
                            // Walls
                            else if (actor instanceof Wall) {
                                atlas = PIXI.loader.resources.wallsAtlas.textures;
                            }
                            // Carpets
                            else if (actor instanceof Carpet) {
                                atlas = PIXI.loader.resources.carpetAtlas.textures;
                            }

                            // Temporary Chest
                            else if (actor instanceof Chest) {
                                atlas = PIXI.loader.resources.terrainAtlas.textures;
                            }

                            // Items
                            else if (actor instanceof InventoryItem || actor instanceof WorldItem) {
                                atlas = PIXI.loader.resources.itemAtlas.textures;
                            }
                            // Terrain
                            else {
                                atlas = PIXI.loader.resources.terrainAtlas.textures;
                            }
                            var sprite = new PIXI.Sprite(atlas[actorSprite.spriteName]);
                            sprite.x = 0 + (x * this.tileSize);
                            sprite.y = 0 + (y * this.tileSize);

                            // As long as it's in the game world, deal with it
                            if (actor instanceof OutOfBounds === false) {

                                // START LIGHTING

                                // Fog it if needed
                                Rendering.fogSprite(sprite, actor.fogged, actor.fogStyle);

                                // Darken it as it leaves the player view radius
                                Rendering.darkenSpriteByDistanceFromLightSource(sprite, actor, world.game.player, Falloff.QuadraticInverse);

                                // Hit it with player light
                                var lightCount: number = 0;
                                if (Geometry.IsPointInCircle(world.game.player.location, world.game.player.viewRadius, actor.location)) {
                                    lightCount += Geometry.getBrightnessForPoint(actor.location, world.game.player.location, world.game.player.viewRadius, 1, Falloff.QuadraticInverse);
                                }

                                if (this.game.settings.graphic.showLighting) {
                                    if (this.game.settings.graphic.showColoredLighting) {
                                        // Count the number of other lights being mixed in
                                        for (let e = 0; e < lights.length; e++) {
                                            var light: Torch = lights[e];
                                            if (Geometry.IsPointInCircle(light.location, light.emitRadius, actor.location)) {
                                                lightCount += light.emitIntensity;
                                            }
                                        }
                                    }
                                    else {
                                        lightCount = 1;
                                    }

                                    // Hit it with the lights, with decreasing intensity the more other lights are in play
                                    for (let e = 0; e < lights.length; e++) {
                                        var light: Torch = lights[e];
                                        if (Geometry.IsPointInCircle(light.location, light.emitRadius, actor.location)) {
                                            var color: number;
                                            if (this.game.settings.graphic.showColoredLighting) {
                                                color = light.emitColor;
                                            }
                                            else {
                                                color = LightColorCode.White
                                            }
                                            // Illuminate it
                                            Rendering.lightSpriteByDistanceFromLightSource(
                                                sprite,
                                                actor,
                                                light,
                                                color,
                                                Falloff.QuadraticInverse,
                                                light.emitIntensity / lightCount // divide the intensity among all lights tot "mix" them
                                            );

                                            // If the actor is normally fogged but happens to be illuminated this frame, then override
                                            //    and reveal their sprite
                                            if (actor.fogged && actor.fogStyle === FogStyle.Hide) {
                                                sprite.visible = true;
                                                if (actor instanceof Chaser)
                                                    var foo = 'bar';
                                            }
                                        }
                                    }

                                    // Fullbright it if needed
                                    if (actor.fullBright) {
                                        sprite.tint = ColorCode.White;
                                        if (actor instanceof Torch) {
                                            sprite.tint = Color.shadeBlendInt(0.4, sprite.tint, actor.emitColor);
                                        }
                                    }
                                }

                                // Draw it
                                layerContainer.addChild(sprite);
                            }

                            // Add health graphics to draw later
                            if (this.game.settings.graphic.showHealth && !actor.fogged && actor.health !== undefined) {
                                this.healthGraphics.push(this.getHealthGraphic(actor, x * this.tileSize, y * this.tileSize));
                            }
                        }
                    }

                }
            }
            this.stageContainer.addChild(layerContainer);
        }

        // Prepare the GUI
        // Horizontal
        this.guiHorizontalContainer.width = this.pixelWidth;
        this.guiHorizontalContainer.height = this.horizontalContainerHeight;
        this.guiHorizontalContainer.x = 0;
        this.guiHorizontalContainer.y = this.pixelHeight - this.horizontalContainerHeight;
        // Horizontal Log
        var gameLog = this.guiGetLogContainer(20);
        gameLog.x = this.guiPad;
        gameLog.y = this.guiPad;
        this.guiLogContainer.addChild(gameLog);
        this.guiHorizontalContainer.addChild(this.guiLogContainer);

        // Vertical
        this.guiVerticalContainer.width = this.verticalContainerWidth;
        this.guiVerticalContainer.height = this.pixelHeight - this.horizontalContainerHeight;
        this.guiVerticalContainer.x = this.pixelWidth - this.verticalContainerWidth;
        this.guiVerticalContainer.y = 0;
        // Draw the background:
        var background = new PIXI.Graphics();
        background.beginFill(ColorCode.DarkGrey, 1);
        background.drawRect(0,0, this.guiVerticalContainer.width, this.guiVerticalContainer.height);
        background.endFill();
        this.guiVerticalContainer.addChild(background);
        // Equip
        var equipMap = this.guiGetEquipMapContainer(1, 5);
        this.guiVerticalContainer.addChild(equipMap);
        equipMap.x = this.verticalContainerWidth - (this.verticalContainerWidth / 2) - (equipMap.width/2);
        equipMap.y = this.guiPad;
        ///
        /// Stats
        var statsContainer = this.guiGetStatsContainer(this.game.player, 40);
        this.guiVerticalContainer.addChild(statsContainer);
        statsContainer.y = equipMap.height + this.guiPad;

        // Collect all GUI elements prior to render
        this.guiOverlayContainer.addChild(this.guiHorizontalContainer);
        this.guiOverlayContainer.addChild(this.guiVerticalContainer);

        // Draw health overlays
        for (var i = 0; i < this.healthGraphics.length; i++) {
            this.guiOverlayContainer.addChild(this.healthGraphics[i]);
        }
        this.healthGraphics = [];

        // Prepare and render the minimap
        if (this.game.settings.minimap.visible) {
            var padding = 20;
            var graphics = this.getMiniMapGraphics(world);
            var mapHolder = new PIXI.Container();
            mapHolder.addChild(graphics);

            switch (this.game.settings.minimap.position) {
                case Corner.TopLeft:
                    mapHolder.position.x = padding
                    mapHolder.position.y = padding;
                    break;
                case Corner.TopRight:
                    mapHolder.position.x = this.pixiRenderer.width - mapHolder.width - padding - this.verticalContainerWidth;
                    mapHolder.position.y = padding;
                    break;
                case Corner.BottomLeft:
                    mapHolder.position.x = padding
                    mapHolder.position.y = this.pixiRenderer.height - mapHolder.height - padding - this.horizontalContainerHeight;
                    break;
                case Corner.BottomRight:
                    mapHolder.position.x = this.pixiRenderer.width - mapHolder.width - padding - this.verticalContainerWidth;
                    mapHolder.position.y = this.pixiRenderer.height - mapHolder.height - padding - this.horizontalContainerHeight;
                    break;
            }

            this.stageContainer.addChild(mapHolder);

        }

        // Draw the overlay/gui
        this.stageContainer.addChild(this.guiOverlayContainer);

        // Draw a menu if we're paused
        if (this.game.activeMenu !== null) {
            this.drawMenu(this.game.activeMenu);
        }

        // Render the frame
        this.stageContainer.scale.x = this.scale;
        this.stageContainer.scale.y = this.scale;

        this.stageContainer.skewX = 10;
        this.stageContainer.skewY = 10;

        this.pixiRenderer.render(this.stageContainer);
    }
}

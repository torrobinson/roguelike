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

    pixiRenderer: any;
    pixiStage: any;

    infoBar: any;
    healthGraphics: any[];

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
        this.infoBar = {
            width: this.width * this.tileSize,
            height: 40,
        };
        this.pixelWidth = this.width * this.tileSize;
        this.pixelHeight = (this.height * this.tileSize) + this.infoBar.height;
        PIXI.RESOLUTION = this.scale;
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width * this.tileSize * this.scale, ((this.height * this.tileSize) + this.infoBar.height) * this.scale, { backgroundColor: 0x000000 });
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();

        this.pixiStage.interactive = true;

        this.healthGraphics = [];
    }

    getInventoryText() {
        var text = '';
        var inv = this.game.player.inventory.map(function(inv) { return inv.name });

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

        text += breadcrumb + '\r\n';
        text += '-'.repeat(breadcrumb.length) + '\r\n';

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
                text += '\r\n';
            }
        }

        var style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 11,
            fill: 0xFFFFFF,
            wordWrap: true,
            wordWrapWidth: 440
        });

        var menuText = new PIXI.Text(text, style);
        // Set the center of the text to be the middle of the canvas
        menuText.x = Math.floor(this.pixiRenderer.width / 2 - menuText.width / 2);
        menuText.y = Math.floor(this.pixiRenderer.height / 2 -  menuText.height / 2);

        var pauseOverlay = new PIXI.Graphics();
        pauseOverlay.beginFill(0x000000, 0.5);
        pauseOverlay.drawRect(0, 0, this.pixelWidth, this.pixelHeight);
        pauseOverlay.endFill();

        // Draw the overlay
        this.pixiStage.addChild(pauseOverlay);

        // Draw the menu on top
        this.pixiStage.addChild(menuText);
    }

    drawInfoBar() {
        var writeLocation = new Point(0, this.height * this.tileSize);
        var text = 'Health: ' + this.game.player.health + ' | Kills: ' + this.game.player.runStats.kills + '\r\n'
            + this.game.getLastLog() + '\r\n'
            + 'Inventory:' + this.getInventoryText();


        var style = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 11,
            fill: 0xFFFFFF,
        });

        var pixiText = new PIXI.Text(text, style);
        pixiText.x = writeLocation.x;
        pixiText.y = writeLocation.y;
        this.pixiStage.addChild(pixiText);
    }

    getHealthGraphic(actor: Actor, x: number, y: number) {
        if (actor.health !== undefined) {
            var heartPipWidth = 3;
            var heartPipHeight = 3;
            var spacingBetweenPips = 3;
            var pipsToDraw = actor.health;

            var totalHeight = heartPipHeight;
            var totalWidth = (pipsToDraw * heartPipWidth) + ((pipsToDraw - 1) * spacingBetweenPips);

            // Offset the pen
            x += (this.tileSize / 2); // move halfway in to the center
            x -= totalWidth / 2; // then move halfway out to it before drawing so that the whole thing is centered
            y -= 5; // move up above the actor

            var healthGraphic = new PIXI.Graphics();
            for (var i = 0; i < pipsToDraw; i++) {
                healthGraphic.beginFill(0xff0800, 1);
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
        var white = 0xFFFFFF;
        var black = 0x000000;
        var red = 0xFF0000;
        var green = 0x00FF00;

        var mapAlpha = this.game.settings.minimap.opacity;

        // Draw the floor as white
        var pixelSize = this.game.settings.minimap.size;

        var graphics = new PIXI.Graphics();
        var floorLayer = world.getLayersOfType(LayerType.Floor).first();
        for (var y = 0; y < floorLayer.tiles.length; y++) {
            for (var x = 0; x < floorLayer.tiles[y].length; x++) {
                var tile = floorLayer.tiles[y][x];
                if (tile !== null && tile.fogged === false) {
                    graphics.beginFill(white, mapAlpha);
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
                        graphics.beginFill(green, 1);
                        graphics.drawRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                    }

                }
            }
        }

        // Draw player location
        graphics.beginFill(red, 1);
        graphics.drawRect(this.game.player.location.x * pixelSize, this.game.player.location.y * pixelSize, pixelSize, pixelSize);

        // Draw a border to show map bounds
        graphics.beginFill(white, 0);
        graphics.lineStyle(1, white, mapAlpha);
        graphics.drawRect(0, 0, world.width * pixelSize, world.height * pixelSize);

        graphics.endFill();
        return graphics;
    }

    drawHealth() {
        for (var i = 0; i < this.healthGraphics.length; i++) {
            this.pixiStage.addChild(this.healthGraphics[i]);
        }
        this.healthGraphics = [];
    }

    drawFrame(world: World, centerPoint: Point) {
        // Clear frame
        for (var i = this.pixiStage.children.length - 1; i >= 0; i--) { this.pixiStage.removeChild(this.pixiStage.children[i]); };

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
                            if (actor instanceof Player || actor instanceof Chaser) {
                                atlas = PIXI.loader.resources.characterAtlas.textures;
                            }
                            else if (actor instanceof Wall) {
                                atlas = PIXI.loader.resources.wallsAtlas.textures;
                            }
                            else if (actor instanceof Carpet) {
                                atlas = PIXI.loader.resources.carpetAtlas.textures;
                            }
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
                                Rendering.darkenSpriteByDistanceFromLightSource(sprite, actor, world.game.player);

                                // Hit it with player light
                                var lightCount: number = 0;
                                if (Geometry.IsPointInCircle(world.game.player.location, world.game.player.viewRadius, actor.location)) {
                                    lightCount++;
                                }

                                if (this.game.settings.graphic.showLighting) {
                                    if (this.game.settings.graphic.showColoredLighting) {
                                        // Count the number of other lights being mixed in
                                        for (let e = 0; e < lights.length; e++) {
                                            var light: Torch = lights[e];
                                            if (Geometry.IsPointInCircle(light.location, light.emitRadius, actor.location)) {
                                                lightCount++;
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
                                        sprite.tint = 0xFFFFFF; // full white
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
            this.pixiStage.addChild(layerContainer);
        }

        // Draw some live game info
        this.drawInfoBar();

        // Draw health
        this.drawHealth();

        // Draw miniMap
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
                    mapHolder.position.x = this.pixiRenderer.width - mapHolder.width - padding;
                    mapHolder.position.y = padding;
                    break;
                case Corner.BottomLeft:
                    mapHolder.position.x = padding
                    mapHolder.position.y = this.pixiRenderer.height - mapHolder.height - padding - this.infoBar.height;
                    break;
                case Corner.BottomRight:
                    mapHolder.position.x = this.pixiRenderer.width - mapHolder.width - padding;
                    mapHolder.position.y = this.pixiRenderer.height - mapHolder.height - padding - this.infoBar.height;
                    break;
            }

            //mapHolder.position.x = this.pixiRenderer.width;
            //mapHolder.position.y = this.pixiRenderer.height;

            this.pixiStage.addChild(mapHolder);

        }

        // Draw a menu if we're paused
        if (this.game.activeMenu !== null) {
            this.drawMenu(this.game.activeMenu);
        }

        // Render the frame
        this.pixiStage.scale.x = this.scale;
        this.pixiStage.scale.y = this.scale;
        this.pixiRenderer.render(this.pixiStage);
    }
}

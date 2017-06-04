/// <reference path="../Helpers/Generic.ts" />
declare var PIXI: any;

class PixiRenderer {

    canvas: any;
    width: number;
    height: number;
    game: Game;

    fps: number;
    fpsHistory: number[] = [];

    tileSize: number;
    scale: number;
    pixelWidth: number;
    pixelHeight: number;

    // Pixi Containers
    pixiRenderer: any;

    // Health pips to display
    healthGraphics: any[];

    // Gui containers & settings
    guiHorizontalContainer: any = new PIXI.Container(); // master bottom bar
    horizontalContainerHeight: number = 200;
    guiLogContainer: any = new PIXI.Container();         // game log
    guiVerticalContainer: any = new PIXI.Container();   // master side bar
    verticalContainerWidth: number = 200;
    guiEquipContainer: any = new PIXI.Container();      // equipment
    guiBarsContainer: any = new PIXI.Container();       // health, XP
    guiStatsContainer: any = new PIXI.Container();      // AP, HP, etc
    guiEffectsContainer: any = new PIXI.Container();    // buffs/debuffs
    guiOverlayContainer: any = new PIXI.Container();    // overlays like health bars
    stageContainer: any = new PIXI.Container();   // the actual game actors
    guiPad: number = 10;
    numberSmokeContainer: any = new PIXI.Container();

    // Filters
    grayscaleFilter: any;
    colorFilter: any;

    // Custom build-once textures
    slotTexture: any = null;

    // For custom drawing
    elapsedSecondsSinceLastFrame: number;
    lastFrameRenderedAt: number;

    // Particles
    particleEmitters: any[] = [];

    // Animated text that fades away (for damage or gold, etc)
    numberSmokes: NumberSmoke[] = [];

    slicedLayers: Layer[];

    constructor(canvas: any, width: number, height: number) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.game = null;

        this.grayscaleFilter = new PIXI.filters.ColorMatrixFilter();
        this.grayscaleFilter.desaturate();

        this.colorFilter = new PIXI.filters.ColorMatrixFilter();
        // Experiemnt with filters
        //this.colorFilte r.desaturate(true);
        //this.colorFilter.technicolor(true);
        //this.colorFilter.technicolor(true);

        this.lastFrameRenderedAt = Date.now();
    }

    startFrameLoop(): void {
        this.drawFrame();
    }

    calculateFps(averageSetSize: number) {
        let newFps = Math.round(1 / this.elapsedSecondsSinceLastFrame);
        this.fpsHistory.push(newFps);
        if (this.fpsHistory.length > averageSetSize) {
            this.fpsHistory.shift();
        }

        this.fps = Math.round(this.fpsHistory.average());
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

    getActorTrimmerScreenLocation(actor: Actor, center: boolean = false) {
        var mainLayerSliced = this.slicedLayers.where((layer) => { return layer.type === LayerType.Wall }).first();
        var found: boolean = false;
        var ended: boolean = false;
        var xScreenTileLocation: number
        var yScreenTileLocation: number;
        while (!found && !ended) {
            for (let y = 0; y < mainLayerSliced.tiles.length; y++) {
                for (let x = 0; x < mainLayerSliced.tiles[y].length; x++) {
                    if (mainLayerSliced.getTile(x, y) == actor) {
                        found = true;
                        xScreenTileLocation = x;
                        yScreenTileLocation = y;
                    }
                }
            }
            ended = true;
        }

        if (center) {
            return new Point(Math.ceil((xScreenTileLocation * this.tileSize) + this.tileSize / 2), Math.ceil((yScreenTileLocation * this.tileSize) + this.tileSize / 2));
        }
        else {
            return new Point(xScreenTileLocation * this.tileSize, yScreenTileLocation * this.tileSize);
        }
    }

    renderHealEffect(actor: Actor, healAmount: number) {
        var screenLocation = this.getActorTrimmerScreenLocation(actor);
        // Number Smoke
        this.renderNumberSmoke(
            '+' + healAmount,
            screenLocation,
            ColorCode.Green
        );

    }

    renderGoldPickupEffect(actor: Actor, goldAmount: number) {
        var screenLocation = this.getActorTrimmerScreenLocation(actor);
        // Number Smoke
        this.renderNumberSmoke(
            '+' + goldAmount,
            screenLocation,
            ColorCode.Yellow
        );

    }
    renderDamageEffect(actor: Actor, damage: number) {
        // Find the actor's screen location by searching sliced layers
        var screenLocationCentered = this.getActorTrimmerScreenLocation(actor, true);
        var screenLocation = this.getActorTrimmerScreenLocation(actor);

        // Number Smoke
        this.renderNumberSmoke(
            '-' + damage,
            screenLocation,
            ColorCode.Red
        );

        // Particles
        var config = ParticleEmitters.DamageEmitter.clone();
        config.pos.x = screenLocationCentered.x;
        config.pos.y = screenLocationCentered.y;

        var emitter = new PIXI.particles.Emitter(
            this.stageContainer,
            [PIXI.loader.resources.particle_standard.texture],
            config
        );
        // Start emitting
        emitter.emit = true;
        // Add to the collection of emitters to handle on every frame render
        this.particleEmitters.push(emitter);
    }

    renderNumberSmoke(text: string, screenLocation: Point, color: number) {
        // Instantiate the number
        var smoke: NumberSmoke = new NumberSmoke(
            this.numberSmokeContainer,
            text,
            screenLocation,
            color
        );

        // And add it to the collection of smokes to be drawn and updated every frame
        this.numberSmokes.push(smoke);
    }

    processNumberSmokes() {
        for (let s = 0; s < this.numberSmokes.length; s++) {
            var smoke: NumberSmoke = this.numberSmokes[s];
            // Update the number's text location and alpha
            smoke.update(this.elapsedSecondsSinceLastFrame);
        }
    }

    getSlotTexture(scale) {
        if (this.slotTexture === null) {
            // Draw the definition of a 'slot'
            var slotGraphic = new PIXI.Graphics();
            var size = this.tileSize * scale;
            var iterations = size / 4;
            var startAlpha = 0.75;
            for (var i = 0; i < iterations; i++) {
                slotGraphic.lineStyle(1, ColorCode.White, Math.max(startAlpha - (i / iterations), 0))
                slotGraphic.drawRect(i, i, size - i * 2, size - i * 2)
            }
            // Create a texture out of it
            this.slotTexture = new PIXI.RenderTexture(this.pixiRenderer, size, size);
            this.slotTexture.render(slotGraphic);
        }
        return this.slotTexture;
    }

    guiGetIndividualBuffContainer(buff: Buff, width: number, height: number) {
        var container = new PIXI.Container();
        var containerGraphics = new PIXI.Graphics();
        var internalPad = 6;

        var granterSpriteName = null;
        if (buff.granter !== null) {
            granterSpriteName = buff.granter.getSprite().spriteName;
        }
        var iconWidth = this.tileSize;
        var scale = 1;
        iconWidth *= scale;

        var style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 10,
            fill: ColorCode.White,
            align: 'center',
            dropShadow: true,
            dropShadowBlur: 1,
            dropShadowColor: ColorCode.Black,
            dropShadowAngle: Math.PI / 3,
            dropShadowDistance: 1,
            wordWrap: true,
            wordWrapWidth: width - internalPad - iconWidth - internalPad - internalPad
        });
        var widthFilled = width * (buff.getUsesRemaining() / buff.maxUses);

        containerGraphics.beginFill(buff.color, 0.5);
        containerGraphics.lineStyle(2, ColorCode.Black, 0.25);
        containerGraphics.drawRect(
            0,
            0,
            width,
            height
        );
        containerGraphics.endFill();

        containerGraphics.beginFill(buff.color);
        containerGraphics.lineStyle(2, ColorCode.Black, 0.25);
        containerGraphics.drawRect(
            0,
            0,
            widthFilled,
            height
        );
        containerGraphics.endFill();

        var atlas = PIXI.loader.resources.itemAtlas.textures;
        var granterSprite = new PIXI.Sprite(atlas[granterSpriteName]);
        granterSprite.scale.x = scale;
        granterSprite.scale.y = scale;
        granterSprite.x = containerGraphics.x + internalPad;
        granterSprite.y = containerGraphics.y + (containerGraphics.height / 2) - (granterSprite.height / 2);

        var buffDescription = buff.getDescription();
        var buffText = new PIXI.Text(buffDescription, style);
        buffText.x = Math.ceil(granterSprite.x + granterSprite.width + internalPad);
        buffText.y = Math.ceil(containerGraphics.height / 2 - buffText.height / 2);

        container.addChild(containerGraphics);
        container.addChild(buffText);
        container.addChild(granterSprite);

        return container;
    }

    guiGetBuffContainer(forActor: Actor, buffHeight: number) {
        var container = new PIXI.Container;
        var buffSpacing = 3;
        var width = this.verticalContainerWidth - this.guiPad - this.guiPad;

        var style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 10,
            fill: ColorCode.White,
            align: 'center',
            dropShadow: true,
            dropShadowBlur: 8,
            dropShadowColor: ColorCode.Black,
            dropShadowAngle: Math.PI / 3,
            dropShadowDistance: 1
        });
        var headerText = new PIXI.Text("Effects:", style);
        headerText.x = Math.ceil(width / 2 - headerText.width / 2 - this.guiPad);
        headerText.y = 10;

        var y = 10 + Math.ceil(headerText.y + buffSpacing + buffHeight / 2);
        for (let b = 0; b < forActor.buffs.length; b++) {
            var buff = forActor.buffs[b];
            var buffItemContainer = this.guiGetIndividualBuffContainer(buff, width, buffHeight);
            container.addChild(buffItemContainer);
            buffItemContainer.x = 0;
            buffItemContainer.y = y;
            y += buffHeight + buffSpacing;
        }

        container.addChild(headerText);
        return container;
    }

    guiGetStatsContainer(forActor: Actor, barHeight: number) {
        var yOffset = Math.ceil(-this.guiPad / 2);
        var style = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 10,
            fill: ColorCode.White,
            align: 'center',
            dropShadow: true,
            dropShadowBlur: 8,
            dropShadowColor: ColorCode.Black,
            dropShadowAngle: Math.PI / 3,
            dropShadowDistance: 1
        });
        var styleBig = style.clone();
        styleBig.fontSize = 14;

        var barTotalWidth = this.verticalContainerWidth - this.guiPad * 2;
        var health = 'HP: ' + forActor.health + ' / ' + forActor.maxHealth() + Generic.NewLine() +
            '(' + forActor.startingHealth + ' player + ' + forActor.getMaxHealthBuff() + ' armor)';
        var healthText = new PIXI.Text(health, style);
        var healthWidth = (forActor.health / forActor.maxHealth()) * barTotalWidth;


        var experience = 'Level ' + forActor.level + Generic.NewLine() +
            '(' + forActor.currentLevelXP + ' / ' + forActor.xpNeeded + ' until ' + (forActor.level + 1) + ')';
        var experienceText = new PIXI.Text(experience, style);
        var experiencehWidth = (forActor.currentLevelXP / forActor.xpNeeded) * barTotalWidth;

        var attackPower = 'Attack Power: ' + forActor.getDamage() + Generic.NewLine() +
            '(' + forActor.defaultAttackPower() + ' player + ' + forActor.getWeaponOnlyDamage() + ' weapon)';
        var attackPowerText = new PIXI.Text(attackPower, style);

        var gold = 'Gold: ' + forActor.gold;
        var goldText = new PIXI.Text(gold, styleBig);
        goldText.style.fontSize = 14;



        // Relative to this stats container, not the entire screen
        var drawX = this.guiPad;
        var drawY = this.guiPad;
        var barPadding = 0;

        var healthLocation = new Point(Math.ceil(this.verticalContainerWidth / 2 - healthText.width / 2), Math.ceil(drawY + barHeight / 2 - healthText.height / 2 + yOffset));
        healthText.x = Math.ceil(healthLocation.x);
        healthText.y = Math.ceil(healthLocation.y);
        var healthBarGraphic = new PIXI.Graphics();
        healthBarGraphic.lineStyle(2, ColorCode.Black, 0.25);
        healthBarGraphic.beginFill(ColorCode.DarkRed, 1);
        healthBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
        healthBarGraphic.endFill();
        healthBarGraphic.beginFill(ColorCode.Red, 1);
        healthBarGraphic.drawRect(drawX, drawY, healthWidth, barHeight + barPadding - this.guiPad);
        healthBarGraphic.endFill();

        drawY += barHeight + barPadding;

        var experienceLocation = new Point(Math.ceil(this.verticalContainerWidth / 2 - experienceText.width / 2), Math.ceil(drawY + barHeight / 2 - experienceText.height / 2 + yOffset));
        experienceText.x = experienceLocation.x;
        experienceText.y = experienceLocation.y;
        var experienceBarGraphic = new PIXI.Graphics();
        experienceBarGraphic.lineStyle(2, ColorCode.Black, 0.25);
        experienceBarGraphic.beginFill(ColorCode.DarkPurple, 1);
        experienceBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
        experienceBarGraphic.endFill();
        experienceBarGraphic.beginFill(ColorCode.Purple, 1);
        experienceBarGraphic.drawRect(drawX, drawY, experiencehWidth, barHeight + barPadding - this.guiPad);
        experienceBarGraphic.endFill();

        drawY += barHeight + barPadding;

        var attackPowerLocation = new Point(Math.ceil(this.verticalContainerWidth / 2 - attackPowerText.width / 2), Math.ceil(drawY + barHeight / 2 - attackPowerText.height / 2 + yOffset));
        attackPowerText.x = attackPowerLocation.x;
        attackPowerText.y = attackPowerLocation.y;
        var attackPowerBarGraphic = new PIXI.Graphics();
        attackPowerBarGraphic.lineStyle(2, ColorCode.Red, 1);
        attackPowerBarGraphic.beginFill(ColorCode.Red, 0);
        attackPowerBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
        attackPowerBarGraphic.endFill();

        drawY += barHeight + barPadding;

        var goldLocation = new Point(Math.ceil(this.verticalContainerWidth / 2 - goldText.width / 2), Math.ceil(drawY + barHeight / 2 - goldText.height / 2 + yOffset));
        goldText.x = goldLocation.x;
        goldText.y = goldLocation.y;
        var goldBarGraphic = new PIXI.Graphics();
        goldBarGraphic.lineStyle(2, ColorCode.Yellow, 1);
        goldBarGraphic.beginFill(ColorCode.Yellow, 0);
        goldBarGraphic.drawRect(drawX, drawY, barTotalWidth, barHeight + barPadding - this.guiPad);
        goldBarGraphic.endFill();



        var statsContainer = new PIXI.Container();
        statsContainer.addChild(healthBarGraphic);
        statsContainer.addChild(healthText);
        statsContainer.addChild(experienceBarGraphic);
        statsContainer.addChild(experienceText);
        statsContainer.addChild(attackPowerBarGraphic);
        statsContainer.addChild(attackPowerText);
        statsContainer.addChild(goldBarGraphic);
        statsContainer.addChild(goldText);

        return statsContainer;
    }

    guiGetEquipMapContainer(scale: number, paddingBetweenSlots: number) {
        var padding = paddingBetweenSlots;

        // Create our sprites based on the slot sprite
        var headSlot = new PIXI.Sprite(this.getSlotTexture(scale));
        var torsoSlot = new PIXI.Sprite(this.getSlotTexture(scale));
        var legSlot = new PIXI.Sprite(this.getSlotTexture(scale));
        var footSlot = new PIXI.Sprite(this.getSlotTexture(scale));
        var handSlot = new PIXI.Sprite(this.getSlotTexture(scale));
        var weaponSlot = new PIXI.Sprite(this.getSlotTexture(scale));

        var atlas = PIXI.loader.resources.itemAtlas.textures;
        if (this.game.player.equippedHead) {
            var headItem = new PIXI.Sprite(atlas[this.game.player.equippedHead.getSprite().spriteName]);
            headItem.scale.x = scale;
            headItem.scale.y = scale;
        }
        if (this.game.player.equippedTorso) {
            var torsoItem = new PIXI.Sprite(atlas[this.game.player.equippedTorso.getSprite().spriteName]);
            torsoItem.scale.x = scale;
            torsoItem.scale.y = scale;
        }
        if (this.game.player.equippedLegs) {
            var legItem = new PIXI.Sprite(atlas[this.game.player.equippedLegs.getSprite().spriteName]);
            legItem.scale.x = scale;
            legItem.scale.y = scale;
        }
        if (this.game.player.equippedFeet) {
            var footItem = new PIXI.Sprite(atlas[this.game.player.equippedFeet.getSprite().spriteName]);
            footItem.scale.x = scale;
            footItem.scale.y = scale;
        }
        if (this.game.player.equippedHands) {
            var handItem = new PIXI.Sprite(atlas[this.game.player.equippedHands.getSprite().spriteName]);
            handItem.scale.x = scale;
            handItem.scale.y = scale;
        }
        if (this.game.player.equippedWeapon) {
            var weaponItem = new PIXI.Sprite(atlas[this.game.player.equippedWeapon.getSprite().spriteName]);
            weaponItem.scale.x = scale;
            weaponItem.scale.y = scale;
        }

        // Create a container for place teh equip slots in
        var equipContainer = new PIXI.Container();
        var size = this.tileSize * scale;
        var slotX = size + padding;
        var slotY = 0;

        // Vertical
        headSlot.x = slotX;
        headSlot.y = slotY;
        equipContainer.addChild(headSlot);
        if (this.game.player.equippedHead) {
            headItem.x = slotX;
            headItem.y = slotY;
            equipContainer.addChild(headItem);
        }
        slotY += size + padding;

        torsoSlot.x = slotX;
        torsoSlot.y = slotY;
        equipContainer.addChild(torsoSlot);
        if (this.game.player.equippedTorso) {
            torsoItem.x = slotX;
            torsoItem.y = slotY;
            equipContainer.addChild(torsoItem);
        }
        slotY += size + padding;

        legSlot.x = slotX;
        legSlot.y = slotY;
        equipContainer.addChild(legSlot);
        if (this.game.player.equippedLegs) {
            legItem.x = slotX;
            legItem.y = slotY;
            equipContainer.addChild(legItem);
        }
        slotY += size + padding;

        footSlot.x = slotX;
        footSlot.y = slotY;
        equipContainer.addChild(footSlot);
        if (this.game.player.equippedFeet) {
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
        if (this.game.player.equippedHands) {
            handItem.x = slotX;
            handItem.y = slotY;
            equipContainer.addChild(handItem);
        }
        slotX += (size + padding) * 2;

        weaponSlot.x = slotX;
        weaponSlot.y = slotY;
        equipContainer.addChild(weaponSlot);
        if (this.game.player.equippedWeapon) {
            weaponItem.x = slotX;
            weaponItem.y = slotY;
            equipContainer.addChild(weaponItem);
        }

        return equipContainer;
    }

    guiGetLogContainer(logCount: number) {
        var container = new PIXI.Container();

        container.height = this.horizontalContainerHeight;
        container.width = this.pixelWidth;

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

    getHealthGraphic(actor: Actor, x: number, y: number) {
        if (actor.health !== undefined) {
            var percentDecimal = (actor.health / actor.maxHealth());

            var maxPipCount = 14;


            var pipsToDraw = Math.ceil(maxPipCount * percentDecimal);
            var heartPipWidth = 1;
            var heartPipHeight = 1;
            var spacingBetweenPips = 0;
            var offsetAboveActor = 1;


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
        var wallLayer = world.getWallLayer();
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

    clearContainer(container: any) {
        for (var i = container.children.length - 1; i >= 0; i--) { container.removeChild(container.children[i]); };
    }

    private drawFrame = () => {

        requestAnimationFrame(this.drawFrame);

        var world: World = this.game.world;
        var centerPoint: Point = this.game.player.location;

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
        var lightLayer = world.getWallLayer();
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
        var layersToRender: Layer[] = Rendering.SliceLayersToSize(
            this.game,        // game reference
            world.layers,     // layer stack to render
            centerPoint,      // Center of viewport. Usually the player.
            this.width,       // Width of viewport
            this.height       // Height of viewport
        );

        this.slicedLayers = layersToRender;

        // Order it by z-index ascending
        layersToRender = layersToRender.sort(function(layer1: Layer, layer2: Layer) { return layer1.zIndex - layer2.zIndex });

        for (var l = 0; l < layersToRender.length; l++) {
            var layer = layersToRender[l];
            var layerContainer = new PIXI.Container();
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (layer.getTile(x, y) !== undefined && layer.getTile(x, y) !== null) {
                        let actor = layer.getTile(x, y);

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

                            // Doors temp
                            else if (actor instanceof Door) {
                                atlas = PIXI.loader.resources.wallsAtlas.textures;
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

                            sprite.x = x * this.tileSize + actorSprite.originOffset.x;
                            sprite.y = y * this.tileSize + actorSprite.originOffset.y;

                            // Set opacity based on visibility
                            if (actor.isVisible === false) {
                                // Still show the player if they are invisble, to indciate
                                //   that they are invisible
                                if (actor instanceof Player) {
                                    sprite.alpha = 0.4;
                                }

                                // If something other than the player is invisible, then
                                //    hide them entirely
                                else {
                                    sprite.visible = false;
                                }
                            }

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

                                // Set other visual traits
                                if (actor.isStone) {
                                    sprite.filters = [this.grayscaleFilter];
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

        // Draw the background:
        var bgTint = ColorCode.DarkestGrey;
        var horizontalTilingSprite = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.circle_bg.texture,
            this.pixelWidth,
            this.horizontalContainerHeight
        );
        horizontalTilingSprite.tint = bgTint
        this.guiHorizontalContainer.addChild(horizontalTilingSprite);


        // Horizontal Log
        var gameLog = this.guiGetLogContainer(20);
        gameLog.x = this.guiPad;
        gameLog.y = this.guiPad;
        this.guiLogContainer.addChild(gameLog);
        this.guiHorizontalContainer.addChild(this.guiLogContainer);

        // Vertical
        this.guiVerticalContainer.width = this.verticalContainerWidth;
        this.guiVerticalContainer.height = this.pixelHeight - this.horizontalContainerHeight;
        this.guiVerticalContainer.x = Math.ceil(this.pixelWidth - this.verticalContainerWidth);
        this.guiVerticalContainer.y = 0;
        // Draw the background:
        var verticalTilingSprite = new PIXI.extras.TilingSprite(
            PIXI.loader.resources.circle_bg.texture,
            this.verticalContainerWidth,
            this.pixelHeight
        );
        verticalTilingSprite.tint = bgTint;
        this.guiVerticalContainer.addChild(verticalTilingSprite);
        // Equip
        var equipMap = this.guiGetEquipMapContainer(1.5, 5);
        this.guiVerticalContainer.addChild(equipMap);
        equipMap.x = Math.ceil(this.verticalContainerWidth - (this.verticalContainerWidth / 2) - (equipMap.width / 2));
        equipMap.y = this.guiPad;
        ///
        /// Stats
        var statsContainer = this.guiGetStatsContainer(this.game.player, 50);
        this.guiVerticalContainer.addChild(statsContainer);
        statsContainer.y = Math.ceil(equipMap.height + this.guiPad * 2);
        /// Buffs
        var buffContainer = this.guiGetBuffContainer(this.game.player, 35);
        this.guiVerticalContainer.addChild(buffContainer);
        buffContainer.x = this.guiPad;
        buffContainer.y = Math.ceil(statsContainer.y + statsContainer.height + this.guiPad);

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


        // Custom animations START
        var now = Date.now();
        this.elapsedSecondsSinceLastFrame = (now - this.lastFrameRenderedAt) * 0.001;
        // Particles
        for (let e = 0; e < this.particleEmitters.length; e++) {
            this.particleEmitters[e].update(this.elapsedSecondsSinceLastFrame);
        }

        // Number Smokes
        this.processNumberSmokes();
        this.stageContainer.addChild(this.numberSmokeContainer);

        // Custom animations END

        // Calculate FPS
        this.calculateFps(20);
        let fpsStyle = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 10,
            fill: ColorCode.White
        });
        let text = new PIXI.Text('FPS: ' + this.fps, fpsStyle);
        text.x = 0;
        text.y = 0;
        this.stageContainer.addChild(text);

        // Render the frame
        this.stageContainer.scale.x = this.scale;
        this.stageContainer.scale.y = this.scale;

        this.stageContainer.filters = [this.colorFilter];

        this.pixiRenderer.render(this.stageContainer);
        this.lastFrameRenderedAt = now;
    }
}

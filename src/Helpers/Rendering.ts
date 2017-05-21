class Rendering {
    static SliceLayersToSize(game: Game, layers: Layer[], centerPoint: Point, width: number, height: number) {
        var slicedLayers = [];

        for (var i = 0; i < layers.length; i++) {
            // For reference
            var layer = layers[i];

            // Our new layer
            var slicedLayer = new Layer(width, height, layer.zIndex, layer.name, layer.type);

            // Draw out the actors in-view from the layer
            var trimmedXToWrite = 0;
            var trimmedYToWrite = 0;

            var topPosition = centerPoint.y - Math.floor(height / 2);
            var bottomPosition = centerPoint.y + Math.ceil(height / 2);
            var leftPosition = centerPoint.x - Math.floor(width / 2);
            var rightPosition = centerPoint.x + Math.ceil(width / 2);

            for (var y = topPosition; y < bottomPosition; y++) {
                for (var x = leftPosition; x < rightPosition; x++) {
                    if (x >= 0 && x < layer.width && y >= 0 && y < layer.height) {
                        slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, layer.getTile(x, y));
                    }
                    else {
                        slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, new OutOfBounds(game));
                    }
                    trimmedXToWrite++;
                }

                trimmedXToWrite = 0;
                trimmedYToWrite++;
            }

            slicedLayers.push(slicedLayer);
        }

        return slicedLayers;
    }

    static fogSprite(sprite: any, fogged: boolean, fogStyle: FogStyle) {
        if (fogStyle === FogStyle.Hide) {
            sprite.visible = !fogged;
        }
        if (fogStyle === FogStyle.Darken) {
            sprite.tint = fogged ? LightColorCode.Black : LightColorCode.White;
        }
    }

    static darkenSpriteByDistanceFromLightSource(sprite: Sprite, spriteActor: Actor, lightSourceActor: Actor, fallOffFunction) {
        var darkColor = LightColorCode.Black;
        if (spriteActor !== null && lightSourceActor !== null && spriteActor.location !== null && lightSourceActor.location !== null) {
            var currentTint = sprite.tint;
            var darkenAmount = 1 - Geometry.getBrightnessForPoint(spriteActor.location, lightSourceActor.location, lightSourceActor.viewRadius, 1, fallOffFunction);
            var newTint = Color.shadeBlendInt(darkenAmount, currentTint, darkColor); // blend that much blackness into it to darken it

            sprite.tint = newTint;
        }
    }

    static lightSpriteByDistanceFromLightSource(sprite: Sprite, spriteActor: Actor, lightSourceActor: Actor, color: number, fallOffFunction, intensity?: number) {
        if (spriteActor !== null && lightSourceActor !== null && spriteActor.location !== null && lightSourceActor.location !== null) {
            if (!intensity) {
                intensity = 1.0;
            }
            var currentTint = sprite.tint;
            var darkenAmount = Geometry.getBrightnessForPoint(spriteActor.location, lightSourceActor.location, lightSourceActor.viewRadius, 1, fallOffFunction) * intensity;
            if (darkenAmount > 0.0) {
                var newTint = Color.shadeBlendInt(darkenAmount, currentTint, color); // blend that much blackness into it to darken it
                sprite.tint = newTint;
            }
        }
    }
}

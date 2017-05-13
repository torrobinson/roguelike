import { Game } from 'src/Game'
import { Layer } from 'src/Layer'
import { Point } from 'src/Point'
import { Enums } from 'src/Helpers/Enums'
import { Actor } from 'src/Actors/Actor'
import { Sprite } from 'src/Actors/Sprites/Sprite'
import { Environment } from 'src/Actors/Environment/Special/OutOfBounds'
import { Geometry } from 'src/Helpers/Geometry'
import { Color } from 'src/Helpers/Color'

export class Rendering {
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
                        slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, new Environment.Special.OutOfBounds(game));
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

    static fogSprite(sprite: Sprite, fogged: boolean, fogStyle: Enums.FogStyle) {
        if (fogStyle === Enums.FogStyle.Hide) {
            sprite.visible = !fogged;
        }
        if (fogStyle === Enums.FogStyle.Darken) {
            sprite.tint = fogged ? 0x555555 : 0xFFFFFF;
        }
    }

    static darkenSpriteByDistanceFromLightSource(sprite: Sprite, spriteActor: Actor, lightSourceActor: Actor) {
        var darkColor = 0x222222; //0x000000 is black
        if (spriteActor !== null && lightSourceActor !== null && spriteActor.location !== null && lightSourceActor.location !== null) {
            var currentTint = sprite.tint;
            var darkenAmount = 1 - Geometry.getBrightnessForPoint(spriteActor.location, lightSourceActor.location, lightSourceActor.viewRadius, 1);
            var newTint = Color.shadeBlendInt(darkenAmount, currentTint, darkColor); // blend that much blackness into it to darken it

            sprite.tint = newTint;
        }
    }
}

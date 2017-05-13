import { Game } from 'src/Game'
import { Room } from 'src/Room'
import { Layer } from 'src/Layer'
import { Enums } from 'src/Helpers/Enums'

export class World{
    width: number;
    height: number;
    layers: Layer[];
    rooms: Room[];
    game: Game;

  constructor(width: number, height: number, game: Game){
    this.width = width;
    this.height = height;
    this.layers = [];
    this.rooms = [];

    // References
    this.game = game;
  }

  addLayer(layer: Layer){
    this.layers.push(layer);
  }

  getLayersOfType(layerType: Enums.LayerType){
      return this.layers.filter(function(layer){
          return layer.type === layerType
      });
  }

  getLayersNotOfType(layerType: Enums.LayerType){
      return this.layers.filter(function(layer){
          return layer.type !== layerType
      });
  }

}

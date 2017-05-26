
class World{
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

  getLayersOfType(layerType: LayerType){
      return this.layers.filter(function(layer){
          return layer.type === layerType
      });
  }

  getLayersNotOfType(layerType: LayerType){
      return this.layers.filter(function(layer){
          return layer.type !== layerType
      });
  }

  static MoveActorToLayer(actor: Actor, layer: Layer): void{
      // Remove from the current layer
      actor.layer.setTile(actor.location.x, actor.location.y, null);

      // Add to the new layer
      layer.placeActor(actor, actor.location);
  }

}

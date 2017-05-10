class World{
  constructor(width, height, game){
    this.width = width;
    this.height = height;
    this.layers = [];
    this.rooms = [];

    // References
    this.game = game;
  }

  addLayer (layer){
    this.layers.push(layer);
  }

  getLayersOfType(layerType){
      return this.layers.filter(function(layer){
          return layer.type === layerType
      });
  }

  getLayersNotOfType(layerType){
      return this.layers.filter(function(layer){
          return layer.type !== layerType
      });
  }

}

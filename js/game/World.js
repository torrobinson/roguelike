class World{
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.layers = [];
    this.rooms = [];
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

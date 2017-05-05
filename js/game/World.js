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

  getLayersOfType(lasyerType){
      return this.layers.filter(function(layer){
          return layer.type === lasyerType
      });
  }

}

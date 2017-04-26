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

}

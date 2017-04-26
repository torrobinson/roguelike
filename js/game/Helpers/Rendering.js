Rendering = function(){};

Rendering.SliceLayersToSize = function(layers, centerPoint, width, height){
  var slicedLayers = [];

  for(var i=0;i<layers.length;i++){
    // For reference
    var layer = layers[i];

    // Our new layer
    var slicedLayer = new Layer();
    slicedLayer = new Layer(width, height, layer.zIndex, layer.name, layer.type);

    // Draw out the actors in-view from the layer
    var trimmedXToWrite = 0;
    var trimmedYToWrite = 0;

    var topPosition     = centerPoint.y-Math.floor(height/2);
    var bottomPosition  = centerPoint.y+Math.ceil(height/2);
    var leftPosition    = centerPoint.x-Math.floor(width/2);
    var rightPosition   = centerPoint.x+Math.ceil(width/2);

    for(var y=topPosition; y<bottomPosition; y++){
      for(var x=leftPosition; x<rightPosition; x++){
        if (x>=0 && x<layer.width && y>=0 && y<layer.height)
        {
            slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, layer.getTile(x,y));
        }
        else
        {
            slicedLayer.setTile(trimmedXToWrite, trimmedYToWrite, new OutOfBounds());
        }
        trimmedXToWrite++;
      }

      trimmedXToWrite = 0;
      trimmedYToWrite++;
    }

    slicedLayers.push(slicedLayer);
  }

  return slicedLayers;
};

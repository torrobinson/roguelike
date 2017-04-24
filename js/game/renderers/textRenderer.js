// A TextRenderer will just take the canvas, init it by adding a textarea, and ten on
//  every frame, it will render the world out as a grid of text to it
TextRenderer = function(canvas){
    this.canvas = canvas;
    this.textArea = null;
    this.init = function(){
        //Set up the canvas, in this case just a textarea
        this.textArea = document.createElement("textarea");
        this.textArea.style.width="100%";
        this.textArea.style.height="100%";
        this.textArea.style.fontFamily = "monospace";
        this.textArea.style.lineHeight = 0.65;
        this.canvas.appendChild(this.textArea);
    };

    // world is a 2d array to render
    this.drawFrame = function(world){

        // Draw each layer from smallest to highest index
        var text = '';
        for(var y=0;y<world.height;y++){
            for(var x=0;x<world.width;x++){
                text+=getTopCharacterAtPoint(world,x,y);
            }
            text+='\r\n';
        }
        this.textArea.value = text;
    };

};

function getTopCharacterAtPoint(world,x,y){
  var layerToSourceTileFrom =  world.layers.sort(sortByZIndex).filter(function(l){return l.tiles[y][x] !== null;}).first();
  if(layerToSourceTileFrom !== null){
    return layerToSourceTileFrom.tiles[y][x].character;
  }
  else {
    return ' ';
  }
}

function sortByZIndex(a,b){
  return a.zIndex - b.zIndex;
}

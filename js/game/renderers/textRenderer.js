// A TextRenderer will just take the canvas, init it by adding a textarea, and ten on
//  every frame, it will render the world out as a grid of text to it
TextRenderer = function(canvas){
    this.canvas = canvas;
    this.init = function(){
    };

    // world is a 2d array to render
    this.drawFrame = function(world){
      this.canvas.innerHtml = '';

      for(var l=0;l <world.layers.length;l++){
          var layer = world.layers[l];
          var textArea = document.createElement("textarea");
          textArea.style.width="100%";
          textArea.style.height="100%";
          textArea.style.fontFamily = "monospace";
          textArea.style.lineHeight = 0.65;
          textArea.style.background = 'transparent';
          textArea.style.position = 'absolute';
          textArea.style.left = 0;
          textArea.style.top = 0;
          textArea.style.zIndex = layer.zIndex;
          textArea.style.overflowY = 'hidden';

          // Draw each layer from smallest to highest index
          var text = '';
          for(var y=0;y<world.height;y++){
              for(var x=0;x<world.width;x++){
                if(layer.tiles[y][x] !== undefined && layer.tiles[y][x] !== null){
                  text+=layer.tiles[y][x].character;
                }
                else{
                  text+=' ';
                }

              }
              text+='\r\n';
          }
          textArea.value = text;

          if(layer.type == Enums.LayerType.Main){
              textArea.style.color = 'black';
          }
          if(layer.type == Enums.LayerType.Floor){
            textArea.style.color = 'red';
          }

          this.canvas.appendChild(textArea);
      }
    };
};

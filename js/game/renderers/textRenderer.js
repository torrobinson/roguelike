TextRenderer = function(canvas, width, height){
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.game = null;

    this.init = function(){
    };

    // World is a 2d array to render
    this.drawFrame = function(world,centerPoint){

      // Clear away any drawn layers
      while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
      }

      // Render the new layers

      // First trim the layer stack to the viewport
      var layersToRender = Rendering.SliceLayersToSize(
        world.layers,     // layer stack to render
        centerPoint,      // Center of viewport. Usually the player.
        this.width,       // Width of viewport
        this.height       // Height of viewport
      );

      for(var l=0; l<layersToRender.length; l++){
          var layer = layersToRender[l];
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
          for(var y=0;y<this.height;y++){
              for(var x=0;x<this.width;x++){
                if(layer.getTile(x,y) !== undefined && layer.getTile(x,y) !== null){
                  text+=layer.getTile(x,y).character;
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

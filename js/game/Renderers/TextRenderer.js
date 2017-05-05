class TextRenderer extends Renderer{
  constructor(canvas, width, height){
    super(canvas, width, height);
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

    init(){
      // Nothing yet
    }

    // World is a 2d array to render
    drawFrame(world,centerPoint){
      // Clear away any drawn layers
      while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
      }

      // Render the new layers

      // First trim the layer stack to the viewport
      var layersToRender = Rendering.SliceLayersToSize(
        this.game,        // game reference
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
          textArea.style.fontSize = '35px';

          // Draw each layer from smallest to highest index
          var text = '';
          for(var y=0;y<this.height;y++){
              for(var x=0;x<this.width;x++){
                if(layer.getTile(x,y) !== undefined && layer.getTile(x,y) !== null){
                    var actor = layer.getTile(x,y);
                    text += actor.getSprite().character;
                }
                else{
                  text+=' ';
                }

              }
              text+='\r\n';
          }
          textArea.value = text;

          if(layer.type == LayerType.Wall){
              textArea.style.color = '#494A4A';
          }
          if(layer.type == LayerType.Floor){
            textArea.style.color = '#1C1C1C';
          }
          if(layer.type == LayerType.Effects){
            textArea.style.color = 'Red';
            textArea.style.opacity = 0.2;
          }

          this.canvas.appendChild(textArea);
      }
    }
}

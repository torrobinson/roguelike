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

        var layers = world.layers.sort(
            function(a,b){
                return a.zIndex - b.zIndex;
            }
        );
        for(var l=0;l<layers.length;l++){
            var layer = layers[l];

            for(var y=0;y<layer.tiles.length;y++){
                for(var x=0;x<layer.tiles[y].length;x++){
                    text+=(layer.tiles[y][x]).character;
                }
                text+='\r\n';
            }
        }

        this.textArea.value = text;
    };

};

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
        this.textArea.style.lineHeight = 0.6;
        this.canvas.appendChild(this.textArea);
    };

    // world is a 2d array to render
    this.drawFrame = function(world){
        
        var text = '';
        for(var y=0;y<world.tiles.length;y++){
            for(var x=0;x<world.tiles[y].length;x++){
                text+=(world.tiles[y][x]).character;
            }
            text+='\r\n';
        }
        this.textArea.value = text;
    };

};

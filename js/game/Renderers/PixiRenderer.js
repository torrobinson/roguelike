class PixiRenderer extends Renderer{
    init(){
        // Set up Pixi and attach to the canvas
        this.pixiRenderer = PIXI.autoDetectRenderer(this.width, this.height, {backgroundColor : 0x1099bb});
        this.canvas.appendChild(this.pixiRenderer.view);
        this.pixiStage = new PIXI.Container();
    }
    drawFrame(world,centerPoint){
        // Center the camera
        var layersToRender = Rendering.SliceLayersToSize(
            this.game,        // game reference
            world.layers,     // layer stack to render
            centerPoint,      // Center of viewport. Usually the player.
            this.width,       // Width of viewport
            this.height       // Height of viewport
          );

        // TODO render each actor on each layer in world.layers

        // Render the frame
        this.pixiRenderer.render(this.pixiStage);
    }
}

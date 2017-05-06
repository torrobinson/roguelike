class Chest extends WorldItem{
    constructor(game, contents){
        super(game);
        this.sprites = ChestSprites;
        this.opened = false;
        this.contents = contents; //array of contents
        this.inventoryItem = null; // rather than 1 item, a chest picks up many
    }

    getStatus(){
        return this.opened ? ActorStatus.Open : ActorStatus.Closed;
    }

    openedBy(actor){
        if(this.opened === false){
            for(var i=0; i<this.contents.length; i++){
                var item = this.contents[i];
                actor.obtainInventoryItem(item);
            }
            this.contents = null;
            this.opened = true;
        }
    }

    pickedUpBy(actor){
        //super(by);
        // Override pickedUp with method to deliver the contents
        this.openedBy(actor);
     }
}

class Chest extends WorldItem{
    constructor(game, contents){
        super(game);
        this.spritesets = ChestSprites;
        this.contents = contents; //array of contents
        this.inventoryItem = null; // rather than 1 item, a chest picks up many
        this.status = ActorStatus.Closed;
    }

    openedBy(actor){
        if(this.status === ActorStatus.Closed){
            for(var i=0; i<this.contents.length; i++){
                var item = this.contents[i];
                actor.obtainInventoryItem(item);
            }
            this.contents = null;
            this.status = ActorStatus.Open;
        }
    }

    pickedUpBy(actor){
        //super(by);
        // Override pickedUp with method to deliver the contents
        this.openedBy(actor);
     }
}

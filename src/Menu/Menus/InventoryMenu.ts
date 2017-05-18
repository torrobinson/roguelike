// <reference path="./Base/Menu.ts" />
var InventoryMenu = new Menu([
    {
        id: "inventory",
        name: "Inventory",
        options: function(){
          var options = [];

          for(let i=0; i<InventoryMenu.game.player.inventory.length; i++){
            let inventoryItem: InventoryItem = InventoryMenu.game.player.inventory[i];
            options.push(
              {
                  menu: InventoryMenu, // set up reference live
                  label: inventoryItem.name,
                  execute: function() {
                      inventoryItem.use();
                      this.menu.containCursor();
                  }
              }
            );
          }

          return options;
        }
    }
]);

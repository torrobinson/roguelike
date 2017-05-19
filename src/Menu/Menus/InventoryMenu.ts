// <reference path="./Base/Menu.ts" />
var InventoryMenu = new Menu([
    {
        id: "inventory",
        name: "Inventory",
        options: function() {
            var options = [];

            for (let i = 0; i < InventoryMenu.game.player.inventory.length; i++) {
                let inventoryItem: InventoryItem = InventoryMenu.game.player.inventory[i];
                options.push(
                    {
                        menu: InventoryMenu, // set up reference live
label: function() {
                            if (inventoryItem instanceof Armor) {
                                return inventoryItem.name + '(+' + inventoryItem.maxHealthBuff + ')' + (inventoryItem.isEquipped ? ' (equipped)' : '');
                            }
                            else {
                                return inventoryItem.name;
                            }
                        },
                        execute: function() {
                            if (inventoryItem instanceof Consumable) {
                                inventoryItem.use();
                            }
                            else if (inventoryItem instanceof Equipment) {
                                inventoryItem.equip();
                            }
                            this.menu.containCursor();
                        }
                    }
                );
            }

            return options;
        }
    }
]);

// <reference path="./Base/Menu.ts" />
var InventoryMenu = new Menu([
    {
        id: "inventory",
        name: "Inventory",
        options: [
            {
                label: function() { return "Equipment" + "(" + InventoryMenu.game.player.getInventoryOfType(Equipment).length + ")" },
                execute: function() {
                    InventoryMenu.navToPage("equipmentMenu");
                }
            },
            {
                label: function() { return "Consumables" + "(" + InventoryMenu.game.player.getInventoryOfType(Consumable).length + ")" },
                execute: function() {
                    InventoryMenu.navToPage("consumablesMenu");
                }
            },
        ]
    },
    {
        id: "equipmentMenu",
        name: "Equipment",
        options: function() {
            var options = [];

            var equipmentTypesToShow = [
                HeadArmor,
                TorsoArmor,
                LegArmor,
                FootArmor,
                HandArmor
            ];

            for (let t = 0; t < equipmentTypesToShow.length; t++) {
                var type = equipmentTypesToShow[t];

                // Options
                var equipment = <Equipment[]>InventoryMenu.game.player.getInventoryOfType(type);

                if (equipment.any()) {
                    // Type Header
                    options.push(
                        {
                            menu: InventoryMenu, // set up reference live
                            label: type.friendlyName,
                        }
                    );
                }

                for (let i = 0; i < equipment.length; i++) {
                    let inventoryItem: Equipment = equipment[i];
                    options.push(
                        {
                            menu: InventoryMenu, // set up reference live
                            label: function() {
                                return ' └──' + inventoryItem.getName() + // Name
                                    (inventoryItem instanceof Armor ? '(+' + inventoryItem.maxHealthBuff + ')' : '') + // Buff
                                    (inventoryItem.isEquipped ? ' (equipped)' : ''); // Equipped status

                            },
                            execute: function() {
                                inventoryItem.equip();
                                this.menu.containCursor();
                            }
                        }
                    );
                }
            }

            return options;
        }
    },

    {
        id: "consumablesMenu",
        name: "Consumables",
        options: function() {
            var options = [];
            var items = <Consumable[]>InventoryMenu.game.player.getInventoryOfType(Consumable);
            for (let i = 0; i < items.length; i++) {
                let inventoryItem: Consumable = items[i];
                options.push(
                    {
                        menu: InventoryMenu, // set up reference live
                        label: function() {
                            return inventoryItem.getName();
                        },
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

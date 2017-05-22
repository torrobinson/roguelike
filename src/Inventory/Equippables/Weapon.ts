/// <reference path="../Base/InventoryItem.ts" />
class Dagger extends Weapon {
    name: string = "Dagger";
    attackPower: number = 2;
    constructor(random: Random, attackPower: number) {
        super(random);
        this.attackPower = attackPower;
    }


}

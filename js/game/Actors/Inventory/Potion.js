class Potion extends InventoryItem {
	constructor(holder) {
		super(holder);
		this.name = 'Potion';
		this.healAmount = 10;
	}

	use() {
		super.use();
		if (this.holder !== null) {
			this.holder.health += this.healAmount;
			if (this.holder.health > this.holder.startingHealth) {
				this.holder.health = this.holder.startingHealth;
			}
		}
	}
}

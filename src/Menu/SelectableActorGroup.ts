class SelectableActorGroup {
    game: Game;
    selectableActors: Actor[];
    selectedIndex: number = null;
    selectedActor: Actor = null;

    constructor(game: Game) {
        this.game = game;
        this.selectableActors = [];
    }

    private wrapIndex() {
        if (this.selectedIndex != null) {
            if (this.selectedIndex >= this.selectableActors.length) {
                this.selectedIndex = 0;
            }
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.selectableActors.length - 1;
            }
        }
    }

    next(): void {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
        else {
            this.selectedIndex++;
        }

        this.wrapIndex();
        this.selectedActor = this.selectableActors[this.selectedIndex];
    }

    previous(): void {
        if (this.selectedIndex === null) {
            this.selectedIndex = 0;
        }
        else {
            this.selectedIndex--;
        }
        this.wrapIndex();
        this.selectedActor = this.selectableActors[this.selectedIndex];
    }

    clear(): void {
        this.selectedIndex = null;
        this.selectedActor = null;
    }

    setGroup(newGroup: Actor[]): void {
        if (this.selectableActors.length === 0) {
            this.selectableActors = newGroup;
        }
        else if (newGroup.length === 0) {
            this.selectableActors = [];
            this.selectedActor = null;
            this.selectedIndex = null;
        }
        else {
            // Remove any ones in here but not newGroup
            var toRemove: Actor[] = [];
            toRemove = this.selectableActors.where(
                (localActor) => { return !newGroup.contains(localActor) }
            );
            for (let r = 0; r <= toRemove.length; r++) {
                this.selectableActors.remove(toRemove[r]);
            }

            // Add ones in newGroup not here
            var toAdd: Actor[] = [];
            toAdd = newGroup.where(
                (newActor) => { return !this.selectableActors.contains(newActor) }
            );
            for (let r = 0; r <= toAdd.length; r++) {
                if (toAdd[r] != undefined && toAdd[r] != null) {
                    this.selectableActors.push(toAdd[r]);
                }
            }
        }
    }

    clearGroup(): void {
        this.selectableActors = [];
        this.selectedActor = null;
        this.selectedIndex = null;
    }

}

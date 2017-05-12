var MainMenu = new Menu([
    {
        id: "mainmenu",
        name: "Main Menu",
        options: [
            {
                label: "Resume",
                execute: function() {
                    this.menu.game.state = GameState.Playing;
                }
            },
            {
                label: "Options...",
                execute: function() {
                    this.menu.navToPage("options");
                }
            },
            {
                label: "Start Over",
                execute: function() {
                    this.menu.navToPage("reset");
                }
            }
        ]
    },

    {
        id: "reset",
        name: "Start Over?",
        options: [
            {
                label: "No",
                execute: function() {
                    this.menu.goBackAPage();
                }
            },
            {
                label: "Yes",
                execute: function() {
                    this.menu.game.player.reset();
                    this.menu.game.setRandomDungeon();
                    this.menu.game.unpause();
                    this.menu.game.gameTick(this.menu.game);
                    this.menu.resetNavStack();
                }
            }
        ]
    },

    {
        id: "options",
        name: "Options",
        options: [
            {
                label: "Controls...",
                execute: function() {
                    this.menu.navToPage("controlOptions");
                }
            },
            {
                label: "Graphics...",
                execute: function() {
                    this.menu.navToPage("graphicOptions");
                }
            },
            {
                label: function() {
                    return (
                        (this.menu.game.settings.showHealth ? "Hide" : "Show") +
                        " health pips"
                    );
                },
                execute: function() {
                    this.menu.game.settings.showHealth = !this.menu.game
                        .settings.showHealth;
                }
            },
            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
                }
            }
        ]
    },

    {
        id: "controlOptions",
        name: "Controls",
        options: [
            {
                label: "Control Option 1",
                execute: function() {}
            },
            {
                label: "Control Option 2",
                execute: function() {}
            },
            {
                label: "Control Option 3",
                execute: function() {}
            },
            {
                label: "Control Option 4",
                execute: function() {}
            },
            {
                label: "Control Option 5",
                execute: function() {}
            },
            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
                }
            }
        ]
    },

    {
        id: "graphicOptions",
        name: "Graphics",
        options: [
            {
                label: "Graphics Option 1",
                execute: function() {}
            },
            {
                label: "Graphics Option 2",
                execute: function() {}
            },
            {
                label: "Graphics Option 3",
                execute: function() {}
            },
            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
                }
            }
        ]
    }
]);

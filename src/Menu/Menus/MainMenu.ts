// <reference path="./Base/Menu.ts" />
var MainMenu = new Menu([
    {
        id: "mainmenu",
        name: "Main Menu",
        options: [
            {
                label: "Resume",
                execute: function() {
                    MainMenu.game.state = GameState.Playing;
                }
            },
            {
                label: "Options...",
                execute: function() {
                    MainMenu.navToPage("options");
                }
            },
            {
                label: "Start Over",
                execute: function() {
                    MainMenu.navToPage("reset");
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
                    MainMenu.goBackAPage();
                }
            },
            {
                label: "Yes",
                execute: function() {
                    MainMenu.game.player.reset();
                    MainMenu.game.generateNextDungeon();
                    MainMenu.game.unpause();
                    MainMenu.game.gameTick(MainMenu.game);
                    MainMenu.resetNavStack();
                }
            }
        ]
    },

    {
        id: "options",
        name: "Options",
        options: [
            {
                label: "Minimap...",
                execute: function() {
                    MainMenu.navToPage("minimapOptions");
                }
            },

            {
                label: "Graphics...",
                execute: function() {
                    MainMenu.navToPage("graphicOptions");
                }
            },


            {
                label: "(back)",
                execute: function() {
                    MainMenu.goBackAPage();
                }
            },

        ]
    },

    {
        id: "graphicOptions",
        name: "Graphics",
        options: [

            {
                label: function() {
                    return (
                        (MainMenu.game.settings.graphic.showHealth ? "Hide" : "Show") +
                        " health pips"
                    );
                },
                execute: function() {
                    MainMenu.game.settings.graphic.showHealth = !MainMenu.game.settings.graphic.showHealth;
                    MainMenu.game.saveSettings();
                }
            },

            {
                label: function() {
                    return (
                        (MainMenu.game.settings.graphic.showLighting ? "Hide" : "Show") +
                        " dynamic lighting"
                    );
                },
                execute: function() {
                    MainMenu.game.settings.graphic.showLighting = !MainMenu.game.settings.graphic.showLighting;
                    MainMenu.game.saveSettings();
                }
            },

            {
                label: function() {
                    return (
                        "└──" +
                        (MainMenu.game.settings.graphic.showColoredLighting ? "Hide" : "Show") +
                        " colored lighting"
                    );
                },
                execute: function() {
                    MainMenu.game.settings.graphic.showColoredLighting = !MainMenu.game.settings.graphic.showColoredLighting;
                    MainMenu.game.saveSettings();
                },
                visible: function() { return MainMenu.game.settings.graphic.showLighting }
            },

            {
                label: "(back)",
                execute: function() {
                    MainMenu.goBackAPage();
                }
            },

        ]
    },

    {
        id: "minimapOptions",
        name: "Minimap",
        options: [
            {
                label: function() {
                    return (
                        (MainMenu.game.settings.minimap.visible ? "Hide" : "Show") +
                        " minimap"
                    );
                },
                execute: function() {
                    MainMenu.game.settings.minimap.visible = !MainMenu.game.settings.minimap.visible;
                    MainMenu.game.saveSettings();
                }
            },

            {
                label: function() {
                    return (
                        "├──Minimap size: " + MainMenu.game.settings.minimap.size
                    );
                },
                execute: function() {
                    MainMenu.game.settings.minimap.size += 0.5;
                    if (MainMenu.game.settings.minimap.size > 3) MainMenu.game.settings.minimap.size = 0.5;
                    MainMenu.game.saveSettings();
                },
                visible: function() { return MainMenu.game.settings.minimap.visible }
            },

            {
                label: function() {
                    return (
                        "├──Minimap opacity: " + MainMenu.game.settings.minimap.opacity
                    );
                },
                execute: function() {
                    MainMenu.game.settings.minimap.opacity += 0.1;
                    MainMenu.game.settings.minimap.opacity = Math.round(MainMenu.game.settings.minimap.opacity * 10) / 10 // nearest 1 decimal place
                    if (MainMenu.game.settings.minimap.opacity > 1) MainMenu.game.settings.minimap.opacity = 0.1;
                    MainMenu.game.saveSettings();
                },
                visible: function() { return MainMenu.game.settings.minimap.visible }
            },

            {
                label: function() {
                    var cornerEnglish;
                    switch (MainMenu.game.settings.minimap.position) {
                        case Corner.TopLeft:
                            cornerEnglish = 'top-left';
                            break;
                        case Corner.TopRight:
                            cornerEnglish = 'top-right';
                            break;
                        case Corner.BottomLeft:
                            cornerEnglish = 'bottom-left';
                            break;
                        case Corner.BottomRight:
                            cornerEnglish = 'bottom-right';
                            break;
                    }
                    return (
                        "└──Minimap position: " + cornerEnglish
                    );
                },
                execute: function() {
                    MainMenu.game.settings.minimap.position++;
                    if (MainMenu.game.settings.minimap.position > 3) MainMenu.game.settings.minimap.position = 0;
                    MainMenu.game.saveSettings();
                },
                visible: function() { return MainMenu.game.settings.minimap.visible }
            },

            {
                label: "(back)",
                execute: function() {
                    MainMenu.goBackAPage();
                }
            },
        ]
    }
]);

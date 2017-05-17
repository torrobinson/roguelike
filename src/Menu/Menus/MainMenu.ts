// <reference path="./Base/Menu.ts" />
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
                label: "Minimap...",
                execute: function() {
                    this.menu.navToPage("minimapOptions");
                }
            },

            {
                label: "Graphics...",
                execute: function() {
                    this.menu.navToPage("graphicOptions");
                }
            },


            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
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
                      (this.menu.game.settings.graphic.showHealth ? "Hide" : "Show") +
                      " health pips"
                  );
              },
              execute: function() {
                  this.menu.game.settings.graphic.showHealth = !this.menu.game.settings.graphic.showHealth;
                  this.menu.game.saveSettings();
              }
          },

          {
              label: function() {
                  return (
                      (this.menu.game.settings.graphic.showLighting ? "Hide" : "Show") +
                      " dynamic lighting"
                  );
              },
              execute: function() {
                  this.menu.game.settings.graphic.showLighting = !this.menu.game.settings.graphic.showLighting;
                  this.menu.game.saveSettings();
              }
          },

          {
              label: function() {
                if(this.menu.game.settings.graphic.showLighting){
                  return (
                      "└──" +
                      (this.menu.game.settings.graphic.showColoredLighting ? "Hide" : "Show") +
                      " colored lighting"
                  );
                }
                else{
                  return null;
                }
              },
              execute: function() {
                  this.menu.game.settings.graphic.showColoredLighting = !this.menu.game.settings.graphic.showColoredLighting;
                  this.menu.game.saveSettings();
              }
          },

            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
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
                        (this.menu.game.settings.minimap.visible ? "Hide" : "Show") +
                        " minimap"
                    );
                },
                execute: function() {
                    this.menu.game.settings.minimap.visible = !this.menu.game.settings.minimap.visible;
                    this.menu.game.saveSettings();
                }
            },

            {
                label: function() {
                    return (
                        "Minimap size: " + this.menu.game.settings.minimap.size
                    );
                },
                execute: function() {
                    this.menu.game.settings.minimap.size += 0.5;
                    if (this.menu.game.settings.minimap.size > 3) this.menu.game.settings.minimap.size = 0.5;
                    this.menu.game.saveSettings();
                }
            },

            {
                label: function() {
                    return (
                        "Minimap opacity: " + this.menu.game.settings.minimap.opacity
                    );
                },
                execute: function() {
                    this.menu.game.settings.minimap.opacity += 0.1;
                    this.menu.game.settings.minimap.opacity = Math.round(this.menu.game.settings.minimap.opacity * 10) / 10 // nearest 1 decimal place
                    if (this.menu.game.settings.minimap.opacity > 1) this.menu.game.settings.minimap.opacity = 0.1;
                    this.menu.game.saveSettings();
                }
            },

            {
                label: function() {
                    var cornerEnglish;
                    switch (this.menu.game.settings.minimap.position) {
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
                        "Minimap position: " + cornerEnglish
                    );
                },
                execute: function() {
                    this.menu.game.settings.minimap.position++;
                    if (this.menu.game.settings.minimap.position > 3) this.menu.game.settings.minimap.position = 0;
                    this.menu.game.saveSettings();
                }
            },

            {
                label: "(back)",
                execute: function() {
                    this.menu.goBackAPage();
                }
            },
        ]
    },

    {
        id: "controlOptions",
        name: "Controls",
        options: [
            {
                label: "Control Option 1",
                execute: function() { }
            },
            {
                label: "Control Option 2",
                execute: function() { }
            },
            {
                label: "Control Option 3",
                execute: function() { }
            },
            {
                label: "Control Option 4",
                execute: function() { }
            },
            {
                label: "Control Option 5",
                execute: function() { }
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
                execute: function() { }
            },
            {
                label: "Graphics Option 2",
                execute: function() { }
            },
            {
                label: "Graphics Option 3",
                execute: function() { }
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

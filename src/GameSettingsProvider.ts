// Default game settings
class GameSettings {
    showHealth: boolean = true;
    minimap: MinimapSettings = new MinimapSettings();
}

class MinimapSettings {
    visible: boolean = true;
    position: string = 'tl';
    size: number = 1.0;
    opacity: number = 1.0;
}

// Provider which fetches and saves game settings, or provides the default
var localStorageName: string = 'gameSettings';
class GameSettingsProvider {
    static getSettings() {
        var settings: GameSettings = JSON.parse(localStorage.getItem(localStorageName));
        if (settings !== undefined && settings !== null) {
            return settings;
        }
        return new GameSettings();
    }

    static saveSettings(gameSettings: GameSettings) {
        if (gameSettings !== undefined && gameSettings !== null) {
            localStorage.setItem(localStorageName, JSON.stringify(gameSettings));
        }
    }
}

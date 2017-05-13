import { PixiRenderer } from 'src/Renderers/PixiRenderer'
import { Game } from 'src/Game'


// FOR DEVELOPMENT
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


// on DOM load
document.addEventListener("DOMContentLoaded", function(event) {
    // Load resources
    PIXI.loader
        .add('terrainAtlas', 'art/rogueliketiles.json')
        .add('characterAtlas', 'art/characters_1.json')
        .add('wallsAtlas', 'art/walls.json')
        .add('carpetAtlas', 'art/dungeoncarpet.json')
        .load(setupGame);

    // On resources load
    function setupGame() {
        // Setup resources

        // Setup game
        var time = (new Date).getTime(); // or specify a seed to be used by the entire game
        var seed: string;
        // FOR DEVELOPMENT
        var seedInQS = getUrlParameter('seed');
        if (seedInQS !== '') {
            seed = seedInQS;
        }
        else {
            history.pushState({}, '', window.location.href + '?seed=' + time);
            seed = time.toString();
        }

        // Our area to render to
        var canvas = document.getElementById('canvas');

        var renderer = new PixiRenderer(
            canvas,
            40, // view width
            30  // view height
        );

        // Prep seed if it's not numeric
        if (seed.match(/[a-z]/i)) {
            var string = seed;
            seed = '';
            for (var i = 0; i < string.length; i++) {
                seed += string.charCodeAt(i);
            }
        }

        // Start the game
        var game = new Game(renderer, parseInt(seed));
        game.setRandomDungeon();
        game.start();

        // Bind keys
        document.onkeydown = keyDown;
        document.onkeyup = keyUp;
        var isKeyRepeating = false;
        var keyRepeatTimer = null;
        var keyRepeatRate = 25; // In milliseconds
        function keyUp(e) {
            if (keyRepeatTimer !== null) {
                clearTimeout(keyRepeatTimer);
                keyRepeatTimer = null;
            }
            isKeyRepeating = false;
        }

        function keyDown(e) {
            e.preventDefault();
            if (isKeyRepeating) {
                if (keyRepeatTimer == null) {
                    keyRepeatTimer = setTimeout(function() {
                        isKeyRepeating = false;
                        clearTimeout(keyRepeatTimer);
                        keyRepeatTimer = null;
                    }, keyRepeatRate);
                }
            }
            else {
                isKeyRepeating = true;
                e = e || window.event;
                game.controlPressed(e.keyCode);
            }
        }
    }
});

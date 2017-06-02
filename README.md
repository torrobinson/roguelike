# roguelike #
![preview](http://i.imgur.com/l29YGJY.png)
This is an experiment to familiarize myself with game mechanics, TypeScript, and Pixi.js

The game "engine" is written entirely from scratch, with the exception of a pathfinder (for resolving paths) and Pixi for drawing images and shapes to the screen.

### To Play: ###
- Install Node.js
  - This should include NPM
- In your project directory root, run `npm install` to install required packages
- Run `gulp` to build
- Run the built`./build/game.html`

## Attribution ##

### Art provided by ###
- https://opengameart.org/content/roguelike-monsters
- Joe Williamson
  - https://opengameart.org/content/roguelike-dungeonworld-tiles
- https://opengameart.org/content/roguelikerpg-items
- DiegoJP
  - https://opengameart.org/content/castledungeon-tileset

### Tools ###
- [Pixi.js](http://pixijs.com)
- [Pathfinding](https://www.npmjs.com/package/pathfinding) by [imor](https://github.com/imor)

### Lessons Learned ###
- Start off using TypeScript, don't try to convert later (kill me)
- Abstract everything
- Separate gameclock from frameclock - game should be playble blind without a renderer attached
- Finding sprite assets and mapping them to actors is hard

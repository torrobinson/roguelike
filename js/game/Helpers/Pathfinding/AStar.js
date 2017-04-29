class AStar extends Pathfinder{
    constructor(){
        super();
        this.engine = new EasyStar.js();
        //this.engine.enableDiagonals();
    }

    setGrid(grid){
        this.engine.setGrid(grid);
    }

    setAcceptableTiles(acceptableTiles){
        this.engine.setAcceptableTiles(acceptableTiles);
    }

    findPath(fromPoint, toPoint, callback){
        this.engine.findPath(fromPoint.x, fromPoint.y, toPoint.x, toPoint.y, callback);
    }
    calculate(){
        this.engine.calculate();
    }
}

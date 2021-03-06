/**
 * Created by wit on 25/03/2015.
 */
var Map =cc.Node.extend({
    ctor:function(){
        this._super();
        this.blockWidth = 50;
        this.blockHeight= 50;
        this.height = screenHeight/this.blockHeight;
        this.width = screenWidth/this.blockWidth;
        this.blocks=[];
        this.monsters=[];
        this.MAP= [
            ".......................................###...........################...........###...................",
            ".......................................UUU.............U...U.U........................................",
            "...............................................................U................U.....................",
            ".......#.................................#...........U...U.......U................U...................",
            "........................................#...............U..........U............###...................",
            ".......................................#.U...........################............U....................",
            ".......U.#R.............................U....................R..................U.....................",
            ".#..#....#....L........................U...........#.....R......L.R......#............................",
            "#######################...........................########################.......UU.............L.L.F#",
            ".......................#..............#############.......................#..............#############",
            ".......................###############....................................###############.............",
            "......................................................................................................",


                    //"...................................",
                    //    "...................................",
                    //    "...................................",
                    //    "...................................",
                    //    "...................................",
                    //    "..................................",
                    //    "...................................",
                    //    "...R LR..L..........................",
                    //    "#######################............",
                    //    ".......................#...........",
                    //    ".......................#############",
                    //    "...................................",

        ];
        this.initMaze();
    },

    initMaze:function() {
        for (var r = 0; r < this.MAP.length; r++) {
            for (var c = 0; c < this.MAP[0].length; c++) {
                var currentCell = this.MAP[r][c];
                if (currentCell == "#") {
                    this.addToMap(new Polegon(c * 50, (this.height - r - 1) * 50, c * 50 + 50, (this.height - r - 1) * 50 + 50));
                }
                else if (currentCell == "F") {
                    this.addChild(new Flag(c*50,(this.height-r-1)*50));
                }
            }
        }
    },

    addMovingObject:function(){
        for (var r = 0; r < this.MAP.length; r++) {
            for (var c = 0; c < this.MAP[0].length; c++) {
                var currentCell = this.MAP[r][c];
                if (currentCell == "R"){
                    this.addToObjectAndMonster(new MonsterAlternatedRight(c * 50, (this.height - r - 1) * 50, this));
                }
                else if(currentCell == "L"){
                    this.addToObjectAndMonster(new MonsterAlternatedLeft(c * 50, (this.height - r - 1) * 50, this));
                }
                else if(currentCell == "U"){
                    this.addToObjectAndMonster(new MonsterYAlternatedUp(c * 50, (this.height - r - 1) * 50, this));
                }
              }
         }
    },

    addToMap:function(object){
        this.blocks.push(object);
        this.addChild(object);
    },

    addToMonsters:function(monster){
        this.addChild(monster);
        this.blocks.push(monster);
    },

    addToObjectAndMonster:function(object){
        this.addChild(object);
        this.blocks.push(object);
        this.monsters.push(object);
    }

});
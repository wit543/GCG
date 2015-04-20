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
            //"......................................................................................................",
            //"......................................................................................................",
            //"......................................................................................................",
            //"......................................................................................................",
            //"......................................................................................................",
            //".......#.........M.........................................................M...........................",
            //"........##............................................................................................",
            //".#..#....#............................................................................................",
            //"#######################...........................########################..........................F#",
            //".......................#..............#############.......................#..............#############",
            //".......................###############....................................###############.............",
            //"......................................................................................................",


                    "...................................",
                        "...................................",
                        "...................................",
                        "...................................",
                        "...................................",
                        "..................................",
                        "...................................",
                        ".....M.............................",
                        "#######################............",
                        ".......................#...........",
                        ".......................#############",
                        "...................................",

                    ];
                this.initMaze();
            },
            initMaze:function() {
                for (var r = 0; r < this.MAP.length; r++) {
                    for (var c = 0; c < this.MAP[0].length; c++) {
                        var currentCell = this.MAP[r][c];
                        if (currentCell == "#") {
                            this.addObjrctToMap(new Polegon(c * 50, (this.height - r - 1) * 50, c * 50 + 50, (this.height - r - 1) * 50 + 50));
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
                if (currentCell == "M") {
                    this.addMonsterToMonsters(new Monster(c * 50, (this.height - r - 1) * 50, this));
                }
              }
         }
    },
    addObjrctToMap:function(object){
        this.blocks.push(object);
        this.addChild(object);
    },
    addMonsterToMonsters:function(monster){
        this.addChild(monster);
        this.monsters.push(monster);
    }
});
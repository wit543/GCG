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
        console.log(this.height+" "+this.width);
        this.blocks=[];
        this.MAP= [
            "................",
            "................",
            "................",
            "................",
            "................",
            ".......#........",
            "........##......",
            ".#..#....#.....F",
            "################",
            "................",
            "................",
            "................",

        ];
        this.initMaze();
    },
    initMaze:function() {
        for (var r = 0; r < this.height; r++) {
            for (var c = 0; c < this.width; c++) {
                var currentCell = this.MAP[r][c];
                if (currentCell == "#") {
                    console.log((this.height - r - 1));
                    this.addObjrctToMap(new Polegon(c * 50, (this.height - r - 1) * 50, c * 50 + 50, (this.height - r - 1) * 50 + 50));

                }
                else if (currentCell == "F") {
                    this.addChild(new Flag(c*50,(this.height-r-1)*50));
                }
            }
        }
    },
    addObjrctToMap:function(object){
        this.blocks.push(object);
        this.addChild(object);
    }
});
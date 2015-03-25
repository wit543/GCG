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
            ".#..#....#......",
            "################",
            "................",
            "................",
            "................",

        ];
        this.initMaze();
    },
    initMaze:function(){
        for(var r = 0;r < this.height;r++){
            for(var c = 0;c< this.width;c++){
                if(this.MAP[r][c]=="#"){
                    console.log((this.height-r-1));
                    var currentPolegon = new Polegon(c*50,(this.height-r-1)*50,c*50+50,(this.height-r-1)*50+50);
                    this.blocks.push(currentPolegon);
                    this.addChild(currentPolegon);
                }
            }
        }
    }
});
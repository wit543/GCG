/**
 * Created by wit on 28/02/2015.
 */
var GameLayer = cc.LayerColor.extend({
    init:function(){
        this._super(new cc.Color(127,127,127));
        this.setPosition(new cc.Point(0,0));
        this.createBlocks();
        //console.log(test.getPosition());
        this.player = new Player(200,600);
        this.player.setBlocks(this.blocks);
        this.addChild(this.player);
        this.player.scheduleUpdate();
        this.scheduleUpdate();
        return true;
    },
    update:function(){
        console.log();
        if(!CollisionDetection.checkCollision(this.player,this.pol)){
            this.player.canMove=false;
        }
    },
    createBlocks:function(){
        this.blocks=[];
        this.blocks.push(new Polegon(200,200,250,250));

        this.blocks.forEach(function(b){
            this.addChild(b);
        },this);
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
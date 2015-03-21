/**
 * Created by wit on 28/02/2015.
 */
var GameLayer = cc.LayerColor.extend({
    init:function(){
        this._super(new cc.Color(127,127,127));
        this.setPosition(new cc.Point(0,0));
        this.pol = new Polegon();
        this.pol.setPosition(cc.p(200,200));
        this.addChild(this.pol);
        //console.log(test.getPosition());
        this.player = new Player();
        this.player.setPosition(new cc.p(200,800));
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
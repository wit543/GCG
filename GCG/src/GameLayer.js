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
        this.addKeyboardHandlers();
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
        var map = new Map();
        this.blocks=map.blocks;
        //this.blocks.push(new Polegon(600,350,650,400));
        //this.blocks.push(new Polegon(650,300,700,350));
        //this.blocks.push(new Polegon(700,350,750,400));
        //this.blocks.push(new Polegon(700,300,750,350));
        //this.blocks.push(new Polegon(700,250,750,300));
        //this.blocks.push(new Polegon(700,200,750,250));
        //this.blocks.push(new Polegon(650,200,700,250));
        //this.blocks.push(new Polegon(600,200,650,250));
        //this.blocks.push(new Polegon(550,200,600,250));
        //this.blocks.push(new Polegon(500,200,550,250));
        //this.blocks.push(new Polegon(450,200,500,250));
        //this.blocks.push(new Polegon(400,200,450,250));
        //this.blocks.push(new Polegon(350,200,400,250));
        //this.blocks.push(new Polegon(300,200,350,250));
        //this.blocks.push(new Polegon(250,200,300,250));
        //this.blocks.push(new Polegon(200,200,250,250));
        //this.blocks.push(new Polegon(250,250,250,300));
        //this.blocks.push(new Polegon(150,200,200,250));
        //this.blocks.push(new Polegon(100,250,150,300));
        //this.blocks.push(new Polegon(50,200,100,250));
        //this.blocks.push(new Polegon(100,200,150,250));
        //this.blocks.forEach(function(b){
        //    this.addChild(b);
        //},this);
        this.addChild(map);
    },

    onKeyDown: function( keyCode, event ) {
        this.player.handleKeyDown( keyCode );
    },

    onKeyUp: function( keyCode, event ) {
        this.player.handleKeyUp( keyCode );
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
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
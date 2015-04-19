/**
 * Created by wit on 28/02/2015.
 */
var GameLayer = cc.LayerColor.extend({
    init:function(){
        this._super(new cc.Color(127,127,127));
        this.setPosition(new cc.Point(0,0));
        this.createBlocks();
        //console.log(test.getPosition());
        this.player = new Player(200,600,this.map);
        this.addChild(this.player);
        this.player.scheduleUpdate();
        this.addKeyboardHandlers();
        this.addMouseHandlers();
        //this.addChild(new Polegon(190,200,50,50));
        //this.addChild(new Polegon(205,215,50,50));
        //this.addChild(new Polegon(190,200,50,66));
        //this.addChild(new Polegon(149,200,48,49));
        //this.monster = new Monster(500,500,this.map);
        //this.addChild(this.monster);
        this.map.addMovingObject();
        this.scheduleUpdate();
        this.initLabel();
        return true;
    },
    initLabel:function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.scoreLabel );
        this.scoreLabel.setString("00");
    },
    update:function(){
        if(!CollisionDetection.checkCollision(this.player,this.pol)){
            this.player.canMove=false;
        }
        //this.moveMap();
    },

    createBlocks:function(){
        this.map = new Map();
        this.blocks=this.map.blocks;
        this.addChild(this.map);
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
    },
    addObject:function(){
        var poly = new Polegon(100,100,150,150);
        this.blocks.push(poly);
        this.addChild(poly);
    },
    addMouseHandlers:function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event){
                var str = "MousePosition X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                //console.log(str);
            },
            onMouseUp: function(event){
                var str = "Mouse Up detected, Key: " + event.getButton();
                console.log(str);
            },
            onMouseDown: function(event){
                var str = "Mouse Down detected, Key: " + event.getButton();
                self.addObject();
                console.log(str);
            },
            onMouseScroll: function(event){
                var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                console.log(str);
            }
        },this);
    },

});

var StartScene = cc.Scene.extend({
    onEnter:function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});
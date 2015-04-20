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

        this.availableBlock = 10;
        this.map.addMovingObject();
        this.scheduleUpdate();
        this.initLabel();

        return true;
    },
    initLabel:function(){
        this.availableBlockLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.availableBlockLabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.availableBlockLabel );
        this.availableBlockLabel.setString(this.availableBlock);
    },
    update:function(){
        if(!CollisionDetection.checkCollision(this.player,this.pol)){
            this.player.canMove=false;
        }
        //this.moveMap();
        this.updateLabel();
    },
    updateLabel:function(){
        this.availableBlockLabel.setString(this.availableBlock);
    },
    createBlocks:function(){
        this.map = new Map();
        this.blocks=this.map.blocks;
        this.addChild(this.map);
    },

    onKeyDown: function( keyCode, event ) {
        this.map.monsters[0].handleKeyDown( keyCode );
    },

    onKeyUp: function( keyCode, event ) {
        this.map.monsters[0].handleKeyUp( keyCode );
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
    addObject:function(x,y){
        if(this.availableBlock>0) {
            var poly = new Polegon((-this.map.x)+x, this.map.y+y, (-this.map.x)+x+50, this.map.y+y+50);
            poly.setAnchorPoint(.5,.5);
            //console.log(poly.x+" "+poly.y);
            //console.log(this.map.x+"   "+this.map.y);
            this.blocks.push(poly);
            this.map.addChild(poly);
            this.availableBlock--;
        }

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
                //console.log(str);
            },
            onMouseDown: function(event){
                var str = "Mouse Down detected, Key: " + event.getButton();
                self.addObject(event.getLocationX(),event.getLocationY());
                //console.log(str);
            },
            onMouseScroll: function(event){
                var str = "Mouse Scroll detected, X: " + event.getLocationX() + "  Y:" + event.getLocationY();
                //console.log(str);
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
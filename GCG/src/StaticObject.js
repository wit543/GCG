var Polegon = cc.Sprite.extend({
    ctor:function(x1,y1,x2,y2) {
        this._super();
        this.initWithFile("res/images/dirt.png",cc.Rect(0,0,x2-x1,y2-y1));
        this.setAnchorPoint(0,0);
        this.setPosition(cc.p(x1,y1));
        this.getTopY=GetTopY;
        this.getRightX=GetRightX;
        this.getLeftX=GetLeftX;
        this.getBottomY=GetBottomY;
        this.hitTop=HitTop;
        this.hitBottom=HitBottom;
        this.hitLeft=HitLeft;
        this.hitRight=HitRight;
        this.scheduleUpdate();
    }

});

var Flag = cc.Sprite.extend({
    ctor:function(x,y){
        this._super(x,y);
        this.initWithFile("res/images/flag.png",cc.Rect(0,0,50,100));
        this.setPosition(new cc.p(x,y));
        this.setAnchorPoint(new cc.p(0,0));
    }
});
var Polegon = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile("res/images/dirt.png");
        this.setAnchorPoint(.5,.5);
        this.size=100;
    }

});
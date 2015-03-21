/**
 * Created by wit on 01/03/2015.
 */
var Player = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile("res/images/player.png");
        this.setAnchorPoint(.5,.5);
        this.size=50;
        this.canMove = true;
    },
    update:function() {
        if(this.canMove)
            this.gravity();
    },
    gravity:function(){
        this.setPositionY(this.getPositionY()-Gravity.CON.EARTH);
    }
});
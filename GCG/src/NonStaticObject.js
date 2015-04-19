/**
 * Created by wit on 14/04/2015.
 */
var Monster = MoveAbleObject.extend({
    ctorExtended:function(){
        this.scheduleUpdate();
        this.moveRight=true;
        this.newX=this.x;
    },
    initMaxVx:function(){
        this.maxVx=3;
    },
    updateSpritePosition:function(){
        this.setPositionX(Math.round(this.newX));
    }
});
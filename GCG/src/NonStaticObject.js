/**
 * Created by wit on 14/04/2015.
 */
var Monster = MoveAbleObject.extend({
    ctorExtended:function(){
        this.scheduleUpdate();
        this.moveRight=true;
        this.moveLeft=false;
        this.newX=this.x;
    },
    initMaxVx:function(){
        this.maxVx=3;
    },
    handleKeyDown:function(keyCode){
        if(Monster.KEYMAP[keyCode]!=undefined){
            this[Monster.KEYMAP[keyCode]]=true;
        }
    },
    handleKeyUp: function (keyCode) {
        if(Monster.KEYMAP[keyCode]!=undefined){
            this[Monster.KEYMAP[keyCode]]=false;
        }
    },
    updateSpritePosition:function() {
        this.setPositionX(Math.round(this.newX));
    },
    updateXMovementExtended:function(){
        this.newX+=this.vx;
    },
   rightCollisionSetPositionX:function(rightBlock){
        this.newX = rightBlock.getRightX()-this.map.x;
    },
    leftCollisionSetPositionX:function(leftBlock){
        this.newX = leftBlock.getLeftX()-50-this.map.x;
    },

});

Monster.KEYMAP= {}
Monster.KEYMAP[cc.KEY.left]= 'moveLeft';
Monster.KEYMAP[cc.KEY.a]= 'moveLeft';
Monster.KEYMAP[cc.KEY.right]= 'moveRight';
Monster.KEYMAP[cc.KEY.d]= 'moveRight';
Monster.KEYMAP[cc.KEY.up]='jump';
Monster.KEYMAP[cc.KEY.w]='jump';
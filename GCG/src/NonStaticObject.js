/**
 * Created by wit on 14/04/2015.
 */
var Monster = MoveAbleObject.extend({
    ctorExtended:function(){
        this.scheduleUpdate();
        this.newX=this.x;
    },
    initMaxVx:function(){
        this.maxVx=3;
    },

    //handleKeyDown:function(keyCode){
    //    if(Monster.KEYMAP[keyCode]!=undefined){
    //        this[Monster.KEYMAP[keyCode]]=true;
    //    }
    //},
    //handleKeyUp: function (keyCode) {
    //    if(Monster.KEYMAP[keyCode]!=undefined){
    //        this[Monster.KEYMAP[keyCode]]=false;
    //    }
    //},
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
    hit: function (player) {
        var Mrect = this.getBoundingBoxToWorld();
        if(player.x>=Mrect.x&&player.x<=Mrect.x+50||player.x+50>=Mrect.x&&player.x+50<=Mrect.x+50){
            if(player.y>Mrect.y-50&&player.y<Mrect.y+50) {
                return true;
            }
        }
    },
    getTopY:function(){
        return cc.rectGetMaxY(this.getBoundingBoxToWorld());
    },

    getRightX:function(){
        return cc.rectGetMaxX(this.getBoundingBoxToWorld());
    },

    getBottomY:function(){
        return cc.rectGetMinY(this.getBoundingBoxToWorld());
    },

    getLeftX:function(){
        return cc.rectGetMinX(this.getBoundingBoxToWorld());
    },

    hitTop: function(oldRect, newRect){
        var brect = this.getBoundingBoxToWorld();

        if(cc.rectGetMinY(oldRect)>= cc.rectGetMaxY(brect)){
            var loweredNewRect = cc.rect(newRect.x,newRect.y-1,newRect.width,newRect.height+1);
            var uRect = cc.rectUnion(oldRect,loweredNewRect);
            var newBrect = cc.rect(brect.x+1,brect.y,brect.width-2,brect.height);
            return cc.rectIntersectsRect(uRect, newBrect);
        }
        return false;
    },

    hitBottom:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();

        if(cc.rectGetMaxY(oldRect)>= cc.rectGetMinY(brect)){
            var upedNewRect = cc.rect(oldRect.x,newRect.y,newRect.width,newRect.height+1);
            var uRect = cc.rectUnion(oldRect,upedNewRect);
            var newBrect = cc.rect(brect.x+1,brect.y,brect.width-2,brect.height-1);
            if(cc.rectIntersectsRect(uRect, newBrect)){
                //console.log(oldRect);
                //console.log(newRect);
                //console.log(uRect);
                //console.log(newBrect);
                return true;
            }
        }
        return false;
    },

    hitRight:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();
        if(oldRect.x>=brect.x&&oldRect.x<=brect.x+50){
            if(oldRect.y>brect.y-50&&oldRect.y<brect.y+50) {
                //console.log(oldRect.x+" "+brect.x);
                return true;
            }
        }
        return false;
    },

    hitLeft:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();
        if(oldRect.x+50>=brect.x&&oldRect.x+50<=brect.x+50){
            if(oldRect.y>brect.y-50&&oldRect.y<brect.y+50) {
                // console.log(oldRect.x-brect.x);
                return true;
            }
        }
        return false;
    }
});

//Monster.KEYMAP= {}
//Monster.KEYMAP[cc.KEY.left]= 'moveLeft';
//Monster.KEYMAP[cc.KEY.a]= 'moveLeft';
//Monster.KEYMAP[cc.KEY.right]= 'moveRight';
//Monster.KEYMAP[cc.KEY.d]= 'moveRight';
//Monster.KEYMAP[cc.KEY.up]='jump';
//Monster.KEYMAP[cc.KEY.w]='jump';


var MonsterAlternated = Monster.extend({
    handleCollisionX:function(oldRect,newRect){
        if(this.vx<=0){
            this.leftSilde=null;
            var rightBlock = this.findRightBlock(this.blocks,oldRect,newRect);
            if(rightBlock){
                this.rightCollisionSetPositionX(rightBlock);
                this.moveRight=true;
                this.moveLeft=false;
                //console.log(rightBlock.getRightX());
                this.vx=0;
            }
        }
        else{
            this.rightSilde=null;
            var leftBlock = this.findLeftBlock(this.blocks,oldRect,newRect);
            if(leftBlock){
                // console.log(this.newX);
                this.leftCollisionSetPositionX(leftBlock);
                this.moveRight=false;
                this.moveLeft=true;
                //this.newX-=this.vx;
                //console.log(leftBlock.getLeftX()-this.getRect().width);
                this.vx=0;
            }
        }
    }
});

var MonsterAlternatedRight = MonsterAlternated.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.moveRight=true;
    }
});
var MonsterAlternatedLeft = MonsterAlternated.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.moveLeft=true;
    }
});

var MonsterRight = Monster.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.moveRight=true;
    }
});
var MonsterLeft = Monster.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.moveLeft=true;
    }
});
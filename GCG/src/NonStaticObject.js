/**
 * Created by wit on 14/04/2015.
 */
var Monster = MoveAbleObject.extend({
    ctorExtended:function(){
        this.scheduleUpdate();
        this.newX=this.x;
        this.initColisionDetection();
    },

    initColisionDetection:function(){
        this.getTopY=GetTopY;
        this.getRightX=GetRightX;
        this.getLeftX=GetLeftX;
        this.getBottomY=GetBottomY;
        this.hitTop=HitTop;
        this.hitBottom=HitBottom;
        this.hitLeft=HitLeft;
        this.hitRight=HitRight;
    },

    initMaxVx:function(){
        this.maxVx=3;
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

    hit: function (player) {
        var Mrect = this.getBoundingBoxToWorld();
        if(player.x>=Mrect.x&&player.x<=Mrect.x+50||player.x+50>=Mrect.x&&player.x+50<=Mrect.x+50){
            if(player.y>Mrect.y-50&&player.y<Mrect.y+50) {
                return true;
            }
        }
    },

});

var MonsterAlternated = Monster.extend({
    handleCollisionX:function(oldRect,newRect){
        if(this.vx<=0){
            this.leftSilde=null;
            var rightBlock = this.findRightBlock(this.blocks,oldRect,newRect);
            if(rightBlock){
                this.rightCollisionSetPositionX(rightBlock);
                this.moveRight=true;
                this.moveLeft=false;
                this.vx=0;
            }
        }
        else{
            this.rightSilde=null;
            var leftBlock = this.findLeftBlock(this.blocks,oldRect,newRect);
            if(leftBlock){
                this.leftCollisionSetPositionX(leftBlock);
                this.moveRight=false;
                this.moveLeft=true;
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

var MonsterY = Monster.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.newX = y;
        console.log(this.moveRight);
        console.log(this.moveLeft);
    },
    updateSpritePosition:function(){
        this.setPositionY(Math.round(this.newX));
    },
    initMaxVx:function(){
        this.maxVx=2;
    },

    updateYMovement:function(){
        //if(this.ground){
        //    this.vy=0;
        //
        //    if(this.jump){
        //        this.vy=this.jumpV;
        //        this.y=this.ground.getTopY()+this.vy;
        //        this.ground = null;
        //    }
        //}else{
        //    this.vy +=this.g;
        //    this.y+=this.vy;
        //}
    },

    handleCollisionY:function(oldRect,newRect){
        this.ground=null;
        if(this.vx<=0){
            var topBlock = this.findTopBlock(this.blocks,oldRect, newRect);
            if(topBlock){
                this.ground = topBlock;
                this.newX= topBlock.getTopY();
                this.vy =0;
                console.log("top");
            }
        }
        else{
            var bottomblock = this.findBottomBlock(this.blocks,oldRect, newRect);
            if(bottomblock){
                this.newX= bottomblock.getBottomY()-this.getRect().height;
                this.vy =0;
                console.log("bottom");
            }
        }
    },
    handleCollisionX:function(oldRect,newRect){
        //if(this.vx<=0){
        //    this.leftSilde=null;
        //    var rightBlock = this.findBottomBlock(this.blocks,oldRect,newRect);
        //    if(rightBlock){
        //        this.rightCollisionSetPositionX(rightBlock);
        //
        //        //console.log(rightBlock.getRightX());
        //        this.vx=0;
        //    }
        //}
        //else{
        //    this.rightSilde=null;
        //    var leftBlock = this.findTopBlock(this.blocks,oldRect,newRect);
        //    if(leftBlock){
        //        // console.log(this.newX);
        //        this.leftCollisionSetPositionX(leftBlock);
        //        //this.newX-=this.vx;
        //        //console.log(leftBlock.getLeftX()-this.getRect().width);
        //        this.vx=0;
        //    }
        //}
    },
    rightCollisionSetPositionX:function(rightBlock){
        this.newX +=this.vx-(this.accX+1);
    },

    leftCollisionSetPositionX:function(leftBlock){
        this.newX +=(this.vx+this.accX+1);
    },
});

var MonsterUp = MonsterY.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.newX = y;
        //this.moveLeft = true;
        this.moveRight = true;
    },
});

var MonsterDown = MonsterY.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.newX = y;
        this.moveLeft = true;
        //this.moveRight = true;
    },
});

var MonsterYAlternated = MonsterY.extend({
    handleCollisionY:function(oldRect,newRect){
        this.ground=null;
        if(this.vx<=0){
            var topBlock = this.findTopBlock(this.blocks,oldRect, newRect);
            if(topBlock){
                this.ground = topBlock;
                this.newX= topBlock.getTopY();
                this.vy =0;
                console.log("top");
                this.moveRight =true;
                this.moveLeft = false;
            }
        }
        else{
            var bottomblock = this.findBottomBlock(this.blocks,oldRect, newRect);
            if(bottomblock){
                this.newX= bottomblock.getBottomY()-this.getRect().height;
                this.vy =0;
                console.log("bottom");
                this.moveRight =false;
                this.moveLeft = true;
            }
        }
    },
});

var MonsterYAlternatedUp = MonsterYAlternated.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.newX = y;
        //this.moveLeft = true;
        this.moveRight = true;
    },
});

var MonsterYAlternatedDown = MonsterYAlternated.extend({
    ctor:function(x,y,map){
        this._super(x,y,map);
        this.newX = y;
        this.moveLeft = true;
        //this.moveRight = true;
    },
});
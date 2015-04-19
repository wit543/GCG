/**
 * Created by wit on 19/04/2015.
 */
var MoveAbleObject =  cc.Sprite.extend({
    ctor:function(x,y,map){
        this._super();
        this.initImgae();
        this.setAnchorPoint(0,0);

        this.x = x;
        this.y = y;


        this.newX =0;
        this.initMaxVx();
        this.initAccX();
        this.initBackAccX();
        this.initJumpV();
        this.initG();

        this.vx =0;
        this.vy =0;

        this.moveLeft = false;
        this.moveRight = false;

        this.jump = false;

        this.ground =null;
        this.blocks = [];
        this.map = null;
        this.setMap(map);
        this.ctorExtended();
    },
    ctorExtended:function(){

    },
    initMaxVx:function(){
        this.maxVx=15;
    },

    initAccX:function(){
        this.accX=.3;
    },

    initG:function(){
        this.g=-.75;
    },

    initBackAccX:function(){
        this.backAccX=.5;
    },

    initJumpV:function(){
        this.jumpV=15;
    },

    initImgae:function(){
        this.initWithFile("res/images/monster.png");
    },

    updateSpritePosition:function(){
        this.map.setPositionX(Math.round(this.newX));
    },

    getRect:function(){
        var spriteRect =this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect(spriteRect.x+dX,spriteRect.y+dY,spriteRect.width,spriteRect.height);
    },

    update:function() {
        if(!this.isDead()){
            var currentPositionRect = this.getRect();
            this.updateYMovement();
            this.updateXMovement();
            var newPositionRect = this.getRect();
            this.handleCollision(currentPositionRect,newPositionRect);
            this.updateSpritePosition();
        }
        else{
            this.vx=0;
            this.removeFromParent();
        }
        this.updateExtended();
    },
    updateExtended:function(){

    },
    updateXMovement:function(){
        if((!this.moveLeft)&&(!this.moveRight)){
            this.autoDeaccelerateX();
        }else if (this.moveRight){
            this.accelerateX(1);
        }else{
            this.accelerateX(-1);
        }
        this.newX-=this.vx;
    },

    updateYMovement:function(){
        if(this.ground){
            this.vy=0;

            if(this.jump){
                this.vy=this.jumpV;
                this.y=this.ground.getTopY()+this.vy;
                this.ground = null;
            }
        }else{
            this.vy +=this.g;
            this.y+=this.vy;
        }
    },

    isSameDirection:function(dir){
        return (((this.vx>=0)&&(dir>=0)) || (this.vx<=0)&&(dir<=0));
    },

    accelerateX:function(dir){
        if(this.isSameDirection((dir))){
            this.vx+= dir*this.accX;
            if(Math.abs(this.vx)>this.maxVx){
                this.vx = dir*this.maxVx;
            }
        }
        else{
            if(Math.abs(this.vx)>=this.backAccX){
                this.vx += dir* this.backAccX;
            }
            else{
                this.vx=0;
            }
        }
    },

    autoDeaccelerateX: function(){
        if(Math.abs(this.vx)<this.accX){
            this.vx=0;
        }
        else if(this.vx >0){
            this.vx -= this.accX;
        }
        else{
            this.vx += this.accX;
        }
    },

    handleCollision:function(oldRect,newRect){
        this.ground=null;
        if(this.vy<=0){
            var topBlock = this.findTopBlock(this.blocks,oldRect, newRect);
            if(topBlock){
                this.ground = topBlock;
                this.y= topBlock.getTopY();
                this.vy =0;
            }
        }
        else{
            var bottomblock = this.findBottomBlock(this.blocks,oldRect, newRect);
            if(bottomblock){
                this.y= bottomblock.getBottomY()-this.getRect().height;
                this.vy =0;
            }
        }

        if(this.vx<=0){
            this.leftSilde=null;
            var rightBlock = this.findRightBlock(this.blocks,oldRect,newRect);
            if(rightBlock){
                this.mapX -=1;
                console.log(rightBlock.getRightX());
                this.vx=0;
            }
        }
        else{
            this.rightSilde=null;
            var leftBlock = this.findLeftBlock(this.blocks,oldRect,newRect);
            if(leftBlock){
                this.rightSilde = leftBlock;
                this.mapX+=1;
                console.log(leftBlock.getLeftX()-this.getRect().width);
                this.vx=0;
            }
        }
    },

    findRightBlock:function(blocks,oldRect,newRect){
        var rightBlock = null;
        var rightBlockX = 1;
        blocks.forEach(function(b){
            if(b.hitRight(oldRect,newRect)){
                if(b.getRightX()>rightBlockX){
                    //console.log("hit left");
                    rightBlock = b;
                    rightBlockX = b.getRightX();
                }
            }
        },this);
        return rightBlock;
    },

    findLeftBlock:function(blocks,oldRect,newRect){
        var leftBlock = null;
        var leftBlockX = -1;
        blocks.forEach(function(b){
            if(b.hitLeft(oldRect,newRect)){
                if(b.getLeftX()>leftBlockX){
                    //console.log("hit right");
                    leftBlock = b;
                    leftBlockX = b.getLeftX();
                }
            }
        },this);
        return leftBlock;
    },

    findBottomBlock:function(blocks,oldRect,newRect){
        var bottomBlock = null;
        var bottomBlockY =0;

        blocks.forEach(function(b){
            if(b.hitBottom(oldRect,newRect)){
                if(b.getBottomY()>bottomBlockY){
                    //console.log("hit top");
                    bottomBlockY = b.getTopY();
                    bottomBlock =b;
                }
            }
        },this);
        return bottomBlock;
    },

    findTopBlock:function(blocks,oldRect,newRect){
        var topBlock = null;
        var topBlockY = -1;

        blocks.forEach(function(b){
            if(b.hitTop(oldRect,newRect)){
                if(b.getTopY()>topBlockY){
                    //console.log("hit bottom");
                    topBlockY = b.getTopY();
                    topBlock =b;
                }
            }
        },this);
        return topBlock;
    },

    isDead: function () {
        return this.y<-100;
    },

    setMap:function(map){
        this.map = map;
        //console.log(map.blocks)
        this.blocks = this.map.blocks;
    }
});

/**
 * Created by wit on 01/03/2015.
 */
var Player = cc.Sprite.extend({
    ctor:function(x,y){
        this._super();
        this.initWithFile("res/images/player.png");
        this.setAnchorPoint(0,0);

        this.x = x;
        this.y = y;

        this.maxVx =15;
        this.accX =.50;
        this.backAccX =0.25;
        this.jumpV = 20;
        this.g =-.25;

        this.vx =0;
        this.vy =0;

        this.moveLeft = false;
        this.moveRight = false;

        this.jump = false;

        this.ground =null;
        this.leftSilde = null;
        this.ceiling = null;
        this.rightSide = null;
        this.blocks = [];
        this.updateSpritePosition();
    },
    updateSpritePosition:function(){
        this.setPosition(cc.p(Math.round(this.x),Math.round(this.y)));
    },
    getPlayerRRect:function(){
        var spriteRect =this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect(spriteRect.x+dX,spriteRect.y+dY,spriteRect.width,spriteRect.height);
    },
    update:function() {
        var currentPositionRect = this.getPlayerRRect();
        this.updateYMovement();
        this.updateXMovement();
        var newPositionRect = this.getPlayerRRect();
        this.handleCollision(currentPositionRect,newPositionRect);
        this.updateSpritePosition();
    },
    updateXMovement:function(){
        if(this.ground){
            if((!this.moveLeft)&&(!this.moveRight)){
                this.autoDeaccelerateX();
            }else if (this.moveRight){
                this.accelerateX(1);
            }else{
                this.accelerateX(-1);
            }
        }

        this.x+=this.vx;
        if(this.x<0){
            this.x +=screenWidth;
        }
        if(this.x>screenWidth){
            this.x-=screenWidth;
        }
    },
    updateYMovement:function(){
        if(this.ground){
            this.vy=0;
            if(this.jump){
                this.vy=this.jumpV;
                this.y=this.ground.getTopY()+this.vy;
                this.ground = null
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
        if(this.ground){
            //if(!this.ground.onTop(newRect)){
                this.ground = null;
            //}
        }
        else{
            if(this.vy<=0){
                var topBlock = this.findTopBlock(this.blocks,oldRect, newRect);
                if(topBlock){
                    this.ground = topBlock;
                    this.y= topBlock.getTopY();
                    this.vy =0;
                }
            }

        }
        if(this.leftSilde){
            //if(!this.leftSilde.onRight()){
                this.leftSilde=null;
            //}
        }
        else{
            if(this.vx<=0){

                var rightBlock = this.findRightBlock(this.blocks,oldRect,newRect);
                if(rightBlock){
                    this.leftSilde = rightBlock;
                    this.x =rightBlock.getRightX();
                    this.vx=0;
                }
            }
        }
    },
    findRightBlock:function(blocks,oldRect,newRect){
        var rightBlock = null;
        var rightBlockX = 1;
        blocks.forEach(function(b){
            if(b.hitRight(oldRect,newRect)){
                if(b.getRightX()>rightBlockX){

                    rightBlock = b;
                    rightBlockX = b.getRightX();
                }
            }
        },this);
        return rightBlock;
    },
    findLeftBlock:function(blocks,oldRect,newRect){
        var rightBlock = null;
        var rightBlockX = -1;
        blocks.forEach(function(b){
            if(b.hitleft(oldRect,newRect)){
                if(b.getLeftX()>rightBlockX){

                    rightBlock = b;
                    rightBlockX = b.getRightX();
                }
            }
        },this);
        return rightBlock;
    }
    findTopBlock:function(blocks,oldRect,newRect){
        var topBlock = null;
        var topBlockY = -1;

        blocks.forEach(function(b){
            if(b.hitTop(oldRect,newRect)){
                if(b.getTopY()>topBlockY){
                    topBlockY = b.getTopY();
                    topBlock =b;
                }
            }
        },this);
        return topBlock;
    },

    handleKeyDown:function(keyCode){
        if(Player.KEYMAP[keyCode]!=undefined){
            this[Player.KEYMAP[keyCode]]=true;
        }
    },
    handleKeyUp: function (keyCode) {
        if(Player.KEYMAP[keyCode]!=undefined){
            this[Player.KEYMAP[keyCode]]=false;
        }
    },
    setBlocks:function(blocks){
        this.blocks = blocks;
    }
});

Player.KEYMAP= {}
Player.KEYMAP[cc.KEY.left]= 'moveLeft';
Player.KEYMAP[cc.KEY.right]= 'moveRight';
Player.KEYMAP[cc.KEY.up]='junp';
var Polegon = cc.Sprite.extend({
    ctor:function(x1,y1,x2,y2) {
        this._super();
        this.initWithFile("res/images/dirt.png",cc.Rect(0,0,x2-x1,y2-y1));
        this.setAnchorPoint(0,0);
        this.setPosition(cc.p(x1,y1));
    },

    getTopY:function(){
        return cc.rectGetMaxY(this.getBoundingBoxToWorld());
    },

    getRightX:function(){
        console.log(this.x+" "+this.y);
        return cc.rectGetMaxX(this.getBoundingBoxToWorld());
    },

    getBottomY:function(){
        return cc.rectGetMinY(this.getBoundingBoxToWorld());
    },

    getLeftX:function(){
        console.log(this.x+" "+this.y);
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

        if(cc.rectGetMinX(oldRect)>=cc.rectGetMaxX(brect)) {
            var leftedNewRect = cc.rect(newRect.x - 1, newRect.y, newRect.width , newRect.height);
            var uRect = cc.rectUnion(oldRect, leftedNewRect);
            var newBrect = cc.rect(brect.x,brect.y+1,brect.width,brect.height-2);
            if(cc.rectIntersectsRect(uRect, newBrect)){
                //console.log(oldRect);
                //console.log(newRect);
                //console.log(uRect);
                console.log(newBrect);
                return true;
            }
        }
        return false;
    },

    hitLeft:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();

        if(cc.rectGetMaxX(oldRect)<=cc.rectGetMinX(brect)) {
            var rightedNewRect = cc.rect(newRect.x, newRect.y, newRect.width + 1, newRect.height);
            var uRect = cc.rectUnion(oldRect, rightedNewRect);
            var newBrect = cc.rect(brect.x,brect.y+1,brect.width,brect.height-2);
            if(cc.rectIntersectsRect(uRect, newBrect)){
                console.log(newBrect);
                return true;
            }
        }
        return false;
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
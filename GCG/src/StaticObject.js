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
            return cc.rectIntersectsRect(uRect,brect);
        }
        return false;
    },
    hitRight:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();
        if(cc.rectGetMinX(oldRect)>=cc.rectGetMaxX(brect)) {
            var leftedNewRect = cc.rect(newRect.x - 1, newRect.y, newRect.width + 1, newRect.height);
            var uRect = cc.rectUnion(oldRect, leftedNewRect);
            var newBrect = cc.rect(brect.x,brect.y,brect.width,brect.height-1);
            return cc.rectIntersectsRect(uRect, newBrect);
        }
        return false;
    },
    hitLeft:function(oldRect,newRect){
        var brect = this.getBoundingBoxToWorld();
        if(cc.rectGetMaxX(oldRect)>=cc.rectGetMinX(brect)) {
            var rightedNewRect = cc.rect(newRect.x, newRect.y, newRect.width + 1, newRect.height);
            var uRect = cc.rectUnion(oldRect, rightedNewRect);
            var newBrect = cc.rect(brect.x,brect.y,brect.width,brect.height-1);
            if(cc.rectIntersectsRect(uRect, newBrect)){
                console.log(uRect);
                console.log(brect);
                return true;
            }
        }
        return false;
    },
    onTop:function(rect){
        var brect = this.getBoundingBoxToWorld();
        var bminx = cc.rectGetMinX(brect);
        var bmaxx = cc.rectGetMaxX(brect);
        var minx = cc.rectGetMinX(rect);
        var maxx = cc.rectGetMaxX(rect);
        return (minx <= bmaxx)&& (bminx <= maxx);
    },
    onRight: function (rect) {
        var brect = this.getBoundingBoxToWorld();
        var bminx = cc.rectGetMinX(brect);
        var bmaxx = cc.rectGetMaxX(brect);
        var minx = cc.rectGetMinX(rect);
        var maxx = cc.rectGetMaxX(rect);
        return false;
    }
});
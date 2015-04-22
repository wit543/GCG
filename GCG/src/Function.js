/**
 * Created by wit on 21/04/2015.
 */
var  GetTopY= function(){
    return cc.rectGetMaxY(this.getBoundingBoxToWorld());
};

var GetRightX= function(){
    return cc.rectGetMaxX(this.getBoundingBoxToWorld());
};

var GetBottomY = function(){
    return cc.rectGetMinY(this.getBoundingBoxToWorld());
};

var GetLeftX = function(){
    return cc.rectGetMinX(this.getBoundingBoxToWorld());
};

var HitTop= function(oldRect, newRect){
    var brect = this.getBoundingBoxToWorld();
    if(oldRect.y>brect.y&&oldRect.y<brect.y+50){
        if(oldRect.x>brect-50&&oldRect.x<brect.x+50){
            return true;
        }
    }
    if(cc.rectGetMinY(oldRect)>= cc.rectGetMaxY(brect)){
        var loweredNewRect = cc.rect(newRect.x,newRect.y-1,newRect.width,newRect.height+1);
        var uRect = cc.rectUnion(oldRect,loweredNewRect);
        var newBrect = cc.rect(brect.x+1,brect.y,brect.width-2,brect.height);
        return cc.rectIntersectsRect(uRect, newBrect);
    }
    return false;
};

var HitBottom=function(oldRect,newRect){
    var brect = this.getBoundingBoxToWorld();
    if(oldRect.y>brect.y&&oldRect.y<brect.y+50){
        if(oldRect.x>brect-50&&oldRect.x<brect.x+50){
            return true;
        }
    }
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
};

var HitRight=function(oldRect,newRect){
    var brect = this.getBoundingBoxToWorld();
    if(oldRect.x>brect.x&&oldRect.x<brect.x+50){
        if(oldRect.y>brect.y-50&&oldRect.y<brect.y+50) {
            //console.log(oldRect.x+" "+brect.x);
            return true;
        }
    }
    return false;
}

var HitLeft=function(oldRect,newRect){
    var brect = this.getBoundingBoxToWorld();
    if(oldRect.x+50>brect.x&&oldRect.x+50<brect.x+50){
        if(oldRect.y>brect.y-50&&oldRect.y<brect.y+50) {
            // console.log(oldRect.x-brect.x);
            return true;
        }
    }
    return false;
};
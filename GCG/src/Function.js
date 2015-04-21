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
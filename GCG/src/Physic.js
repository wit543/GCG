/**
 * Created by wit on 01/03/2015.
 */
var Gravity={
    getPosition:function(pos){
    }
};
Gravity.CON={
    EARTH:9.8
};
var CollisionDetection ={
    checkCollision:function(player,object){
        var playerPoint = this.getQuadrilateralsColisionPoint(player);
        var objectPoint = this.getQuadrilateralsColisionPoint(object)
        for(var i=0;i<playerPoint.length;i++){
            var c = false;
            for(var j=0;j<objectPoint.length;j++){
                if(c){
                    continue;
                }
                if (!this.collision(playerPoint[i][0], playerPoint[i][2], objectPoint[j])) {
                    c=true;
                }
            }
            if(c){
                return true;
            }

        }
        return false;
    },
    collision:function(otherX,otherY,colPoint){
        var posX=colPoint[0];
        var signX=colPoint[1];
        var posY=colPoint[2];
        var signY=colPoint[3];
        var x=false;
        var y=false;
        if(signX==true){
            if(otherX<=posX){
                x=true;
            }
        }
        if(signX==false){
            if(otherX>=posX){
                x=true;
            }
        }
        if(signY==true){
            if(otherY<=posY){
                y=true;
            }
        }
        if(signY==false) {
            if (otherY >= posY) {
                y = true;
            }
        }
        if(x==true&&y==true){
            return true;
        }
        return false;
    },
    checkCollision:function(posX1,signX1,posY1,signY1,posX2,signX2,posY2,signY2){

    },
    checkEachCollision:function(pos1,pos2,sign2){
        if(sign2){

        }
    },
    getQuadrilateralsColisionPoint:function(object){
        var size = object.size;
        var x = object.getPositionX();
        var y = object.getPositionY();
        var collisionPoint=[];
        collisionPoint.push([x+size,true,y+size,true]);
        collisionPoint.push([x+size,true,y-size,false]);
        collisionPoint.push([x-size,false,y+size,true]);
        collisionPoint.push([x-size,false,y-size,false]);
        return collisionPoint;
    }
}
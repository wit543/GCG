/**
 * Created by wit on 01/03/2015.
 */
var Player = MoveAbleObject.extend({

    handleKeyDown:function(keyCode){
        if(Player.KEYMAP[keyCode]!=undefined){
            this[Player.KEYMAP[keyCode]]=true;
        }
    },

    initLive: function () {
        this.live = 1;
    },

    initImgae:function(){
        this.initWithFile("res/images/player.png");
    },

    handleCollisionExtended:function(){
        this.map.monsters.forEach(function(b){
            if(b.hit(this)){
                this.live--;
            }
        },this);
    },

    handleKeyUp: function (keyCode) {
        if(Player.KEYMAP[keyCode]!=undefined){
            this[Player.KEYMAP[keyCode]]=false;
        }
    }

});

Player.KEYMAP= {}
Player.KEYMAP[cc.KEY.left]= 'moveLeft';
Player.KEYMAP[cc.KEY.a]= 'moveLeft';
Player.KEYMAP[cc.KEY.right]= 'moveRight';
Player.KEYMAP[cc.KEY.d]= 'moveRight';
Player.KEYMAP[cc.KEY.up]='jump';
Player.KEYMAP[cc.KEY.w]='jump';
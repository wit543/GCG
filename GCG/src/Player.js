/**
 * Created by wit on 01/03/2015.
 */
var Player = MoveAbleObject.extend({

    handleKeyDown:function(keyCode){
        if(Player.KEYMAP[keyCode]!=undefined){
            this[Player.KEYMAP[keyCode]]=true;
        }
    },
    initImgae:function(){
        this.initWithFile("res/images/player.png");
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
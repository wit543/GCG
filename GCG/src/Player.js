/**
 * Created by wit on 01/03/2015.
 */
var Player = MoveAbleObject.extend({

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
});

Player.KEYMAP= {}
Player.KEYMAP[cc.KEY.left]= 'moveLeft';
Player.KEYMAP[cc.KEY.right]= 'moveRight';
Player.KEYMAP[cc.KEY.up]='jump';
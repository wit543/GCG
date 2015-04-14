/**
 * Created by wit on 14/04/2015.
 */
var Monster = cc.Sprite.extend({
    ctor: function (x, y) {
        this.initWithFile("res/images/monster.png");
        this.x=x;
        this.y=y;
    }
});
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        _super.call(this);
        this.isFlipping = false;
        var data = RES.getRes("card_json");
        var texture = RES.getRes("card_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        this.addChild(this.mc);
    }
    Card.prototype.startFlip = function (flipToWhichFrame) {
        this.isFlipping = true;
        this.flipStep = 10;
        this.flipToFrame = flipToWhichFrame;
        this.mc.addEventListener(egret.Event.ENTER_FRAME, this.flip, this);
    };
    Card.prototype.flip = function (event) {
        this.flipStep--;
        if (this.flipStep > 5) {
            this.mc.scaleX = .20 * (this.flipStep - 6);
        }
        else {
            this.mc.scaleX = .20 * (5 - this.flipStep);
        }
        if (this.flipStep == 5) {
            this.mc.gotoAndStop(this.flipToFrame);
        }
        if (this.flipStep == 0) {
            this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.flip, this);
        }
    };
    return Card;
})(egret.DisplayObjectContainer);
Card.prototype.__class__ = "Card";

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var T = (function (_super) {
    __extends(T, _super);
    function T() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    T.prototype.onAddToStage = function (event) {
        //var tmc:TestMovieClip = new TestMovieClip();
        //tmc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        //this.addChild(tmc);
        var data = RES.getRes("card_json");
        var texture = RES.getRes("card_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        this.addChild(mc);
        mc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    };
    T.prototype.click = function (e) {
        console.log("ok");
    };
    return T;
})(egret.DisplayObjectContainer);
T.prototype.__class__ = "T";

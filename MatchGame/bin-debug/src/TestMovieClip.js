var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestMovieClip = (function (_super) {
    __extends(TestMovieClip, _super);
    function TestMovieClip() {
        _super.call(this);
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawRect(0, 0, 100, 200);
        shp.graphics.endFill();
        this.addChild(shp);
    }
    return TestMovieClip;
})(egret.DisplayObjectContainer);
TestMovieClip.prototype.__class__ = "TestMovieClip";

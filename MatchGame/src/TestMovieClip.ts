class TestMovieClip extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0xff0000, 1);
        shp.graphics.drawRect( 0, 0, 100, 200 );
        shp.graphics.endFill();
        this.addChild(shp);
    }
}
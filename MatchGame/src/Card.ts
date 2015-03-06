class Card extends egret.DisplayObject
{
    private flipStep:number;
    private isFlipping:boolean = false;
    private flipToFrame:number;
    public cardFace:number;
    private mc:egret.MovieClip;

    public constructor()
    {
        super();
        var data = RES.getRes("card_json");
        var texture = RES.getRes("card_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());
    }

    public startFlip(flipToWhichFrame:number):void
    {
        this.isFlipping = true;
        this.flipStep = 10;
        this.flipToFrame = flipToWhichFrame;
        this.mc.addEventListener(egret.Event.ENTER_FRAME, this.flip, this);
    }

    public flip(event:egret.Event):void
    {
        this.flipStep--;

        if(this.flipStep > 5)
        {
            this.mc.scaleX = .20 * (this.flipStep - 6);
        }
        else
        {
            this.mc.scaleX = .20 * (5 - this.flipStep);
        }

        if(this.flipStep == 5)
        {
            this.mc.gotoAndStop(this.flipToFrame);
        }

        if(this.flipStep == 0)
        {
            this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.flip, this);
        }
    }
}
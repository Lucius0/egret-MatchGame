class Card extends egret.MovieClip
{
    public constructor()
    {
        super();
        this.touchEnabled = true;
        //var data = RES.getRes("card_json");
        //var texture = RES.getRes("card_png");
        //var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        //this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());

        //this.mc.gotoAndStop(1);
        //this.addChild(this.mc);
    }
    private flipStep:number;
    private isFlipping:boolean = false;
    private flipToFrame:number;
    public cardFace:number;
    public startFlip(flipToWhichFrame:number):void
    {
        this.isFlipping = true;
        this.flipStep = 10;
        this.flipToFrame = flipToWhichFrame;
        this.addEventListener(egret.Event.ENTER_FRAME, this.flip, this);
    }

    public flip(event:egret.Event):void
    {
        this.flipStep--;

        if(this.flipStep > 5)
        {
            this.scaleX = .20 * (this.flipStep - 6);
        }
        else
        {
            this.scaleX = .20 * (5 - this.flipStep);
        }

        if(this.flipStep == 5)
        {
            this.gotoAndStop(this.flipToFrame);
        }

        if(this.flipStep == 0)
        {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.flip, this);
        }
    }
}
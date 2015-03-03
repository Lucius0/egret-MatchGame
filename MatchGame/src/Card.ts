class Card
{
    private flipStep:number;
    private isFlipping:boolean = false;
    private flipToFrame:number;
    private mc:egret.gui.MovieClip;

    public constructor()
    {
        super();
    }

    public startFlip(flipToWhichFrame:number):void
    {
        this.isFlipping = true;
        this.flipStep = 10;
        this.flipToFrame = flipToWhichFrame;
        addEventListener(egret.Event.ENTER_FRAME, this.flip, this);
    }

    public flip(event:egret.Event):void
    {
        this.flipStep--;

        if(this.flipStep > 5)
        {

        }
    }
}
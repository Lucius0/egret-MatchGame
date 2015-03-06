class GameApp extends egret.DisplayObjectContainer
{
    private static boardWidth:number = 6;
    private static boardHeight:number = 6;
    private static cardHorizontalSpacing:number = 52;
    private static cardVerticalSpacing:number = 52;
    private static boardOffsetX:number = 145;
    private static boardOffsetY:number = 70;
    private static pointsForMatch:number = 100;
    private static pointsForMiss:number = -5;

    private firstCard:Card;
    private secondCard:Card;
    private cardsLeft:number;
    private gameScore:number;
    private gameStartTime:number;
    private gameTime:number;

    private gameScoreField:egret.TextField;
    private gameTimeField:egret.TextField;

    private flipBackTimer:egret.Timer;

    private constructor()
    {
        var cardList:Array = new Array();
        for(var i:number = 0; i < GameApp.boardHeight * GameApp.boardWidth / 2; i++)
        {
            cardList.push(i);
            cardList.push(i);
        }

        this.cardsLeft = 0;
        for(var x:number = 0; x < GameApp.boardWidth; x++)
        {
            for(var y:number = 0; y < GameApp.boardHeight; y++)
            {
                var c:Card = new Card();
                var mc:egret.MovieClip = c.getMc();
                mc.x = x * GameApp.cardHorizontalSpacing + GameApp.boardOffsetX; // set position
                mc.y = y * GameApp.cardVerticalSpacing + GameApp.boardOffsetY;
                var r:number = Math.floor(Math.random() * cardList.length);
                c["cardFace"] = cardList[r];
                
            }
        }
    }
}
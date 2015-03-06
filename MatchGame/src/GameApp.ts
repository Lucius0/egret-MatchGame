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
                c.x = x * GameApp.cardHorizontalSpacing + GameApp.boardOffsetX; // set position
                c.y = y * GameApp.cardVerticalSpacing + GameApp.boardOffsetY;
                var r:number = Math.floor(Math.random() * cardList.length);
                c.cardFace = cardList[r];
                cardList.splice(r, 1);
                c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCard, this);
                c.touchEnabled = true;
                this.addChild(c);
                this.cardsLeft++;
            }
        }

        this.gameScoreField = new egret.TextField();
        this.addChild(this.gameScoreField);
        this.gameScore = 0;
        this.showGameScore();

        this.gameTimeField = new egret.TextField();
        this.gameTimeField.x = 450;
        this.addChild(this.gameTimeField);
        this.gameStartTime = egret.getTimer();
        this.gameTime = 0;
        this.addEventListener(egret.ENTER_FRAME, this.showTime, this);
    }

    private clickCard(e:egret.TouchEvent):void
    {
        var thisCard:Card = e.target;

        if(this.firstCard == null)
        {
            this.firstCard = thisCard;
            var temp:number = thisCard.cardFace + 2;
            thisCard.startFlip(temp);
        }
        else if(this.firstCard == thisCard)
        {
            this.firstCard.startFlip(1);
            this.firstCard == null;
        }
        else if(this.secondCard == null)
        {
            this.secondCard = thisCard;
            var temp:number = thisCard.cardFace + 2;
            thisCard.startFlip(temp);

            if(this.firstCard.cardFace == this.secondCard.cardFace)
            {
                this.removeChild(this.firstCard);
                this.removeChild(this.secondCard);

                this.firstCard = null;
                this.secondCard = null;

                this.gameScore += GameApp.pointsForMatch;
                this.showGameScore();

                if(this.cardsLeft == 0)
                {
                    console.log("game over");
                }
            }
            else
            {
                this.gameScore += GameApp.pointsForMiss;
                this.showGameScore();
                this.flipBackTimer = new egret.Timer(2000, 1);
                this.flipBackTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);
                this.flipBackTimer.start();
            }
        }
        else
        {
            this.returnCards(null);

            this.firstCard = thisCard;
            var temp:number = thisCard.cardFace + 2;
            this.firstCard.startFlip(temp);
        }
    }

    private returnCards(e:egret.TimerEvent):void
    {

    }

    private showTime(event:Event):void
    {

    }

    private showGameScore():void
    {

    }
}
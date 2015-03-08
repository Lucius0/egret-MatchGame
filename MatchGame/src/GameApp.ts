class GameApp extends egret.DisplayObjectContainer
{
    private static boardWidth:number = 6;
    private static boardHeight:number = 6;
    private static cardHorizontalSpacing:number = 52;
    private static cardVerticalSpacing:number = 52;
    private static boardOffsetX:number = 50;
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

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event):void
    {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/matchGame.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("matchGame");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void
    {
        if (event.groupName == "matchGame")
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createScene();
        }
    }

    private createScene():void
    {
        var cardList:Array<number> = new Array();
        for(var i:number = 0; i < GameApp.boardHeight * GameApp.boardWidth / 2; i++)
        {
            cardList.push(i);
            cardList.push(i);
        }

        this.cardsLeft = 0;

        var data = RES.getRes("card_json");
        var texture = RES.getRes("card_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);

        for(var x:number = 0; x < GameApp.boardWidth; x++)
        {
            for(var y:number = 0; y < GameApp.boardHeight; y++)
            {
                var c:Card = <Card>new egret.MovieClip(mcDataFactory.generateMovieClipData());
                c.touchEnabled = true;
                c.x = x * GameApp.cardHorizontalSpacing + GameApp.boardOffsetX; // set position
                c.y = y * GameApp.cardVerticalSpacing + GameApp.boardOffsetY;
                var r:number = Math.floor(Math.random() * cardList.length);
                c.cardFace = cardList[r];
                cardList.splice(r, 1);
                this.addChild(c);
                c.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCard, this);
                this.cardsLeft++;
            }
        }

        this.gameScoreField = new egret.TextField();
        this.gameScoreField.textColor = 0x000000;
        this.addChild(this.gameScoreField);
        this.gameScore = 0;
        this.showGameScore();

        this.gameTimeField = new egret.TextField();
        this.gameTimeField.textColor = 0x000000;
        this.gameTimeField.x = 300;
        this.addChild(this.gameTimeField);
        this.gameStartTime = egret.getTimer();
        this.gameTime = 0;
        this.addEventListener(egret.Event.ENTER_FRAME, this.showTime, this);
    }

    private clickCard(e:egret.TouchEvent):void
    {
        console.log("1111111111111111111111111111");
        var thisCard:Card = <Card>e.target;
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
        this.firstCard.startFlip(1);
        this.secondCard.startFlip(1);
        this.firstCard = null;
        this.secondCard = null;
        this.flipBackTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);

    }

    private showTime(event:Event):void
    {
        this.gameTime = egret.getTimer() - this.gameStartTime;
        this.gameTimeField.text = "Time:  " + this.clockTime(this.gameTime);
    }

    private clockTime(ms:number):string
    {
        var seconds:number = Math.floor(ms/1000);
        var minutes:number = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        var timeString:string = minutes + ":" + String(seconds + 100).substr(1, 2);
        return timeString;
    }

    private showGameScore():void
    {
        this.gameScoreField.text = "Score:  " + String(this.gameScore);
    }
}
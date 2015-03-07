var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GameApp.prototype.onAddToStage = function (event) {
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/matchGame.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    GameApp.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("matchGame");
    };
    /**
     * preload资源组加载完成
     */
    GameApp.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "matchGame") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createScene();
        }
    };
    GameApp.prototype.createScene = function () {
        var cardList = new Array();
        for (var i = 0; i < GameApp.boardHeight * GameApp.boardWidth / 2; i++) {
            cardList.push(i);
            cardList.push(i);
        }
        this.cardsLeft = 0;
        var data = RES.getRes("card_json");
        var texture = RES.getRes("card_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        for (var x = 0; x < GameApp.boardWidth; x++) {
            for (var y = 0; y < GameApp.boardHeight; y++) {
                var c = new egret.MovieClip(mcDataFactory.generateMovieClipData());
                c.x = x * GameApp.cardHorizontalSpacing + GameApp.boardOffsetX; // set position
                c.y = y * GameApp.cardVerticalSpacing + GameApp.boardOffsetY;
                var r = Math.floor(Math.random() * cardList.length);
                c.cardFace = cardList[r];
                cardList.splice(r, 1);
                c.addEventListener(egret.TouchEvent.TOUCH_END, this.clickCard, this);
                c.touchEnabled = true;
                this.addChild(c);
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
    };
    GameApp.prototype.clickCard = function (e) {
        console.log(1);
        var thisCard = e.target;
        if (this.firstCard == null) {
            this.firstCard = thisCard;
            var temp = thisCard.cardFace + 2;
            thisCard.startFlip(temp);
        }
        else if (this.firstCard == thisCard) {
            this.firstCard.startFlip(1);
            this.firstCard == null;
        }
        else if (this.secondCard == null) {
            this.secondCard = thisCard;
            var temp = thisCard.cardFace + 2;
            thisCard.startFlip(temp);
            if (this.firstCard.cardFace == this.secondCard.cardFace) {
                this.removeChild(this.firstCard);
                this.removeChild(this.secondCard);
                this.firstCard = null;
                this.secondCard = null;
                this.gameScore += GameApp.pointsForMatch;
                this.showGameScore();
                if (this.cardsLeft == 0) {
                    console.log("game over");
                }
            }
            else {
                this.gameScore += GameApp.pointsForMiss;
                this.showGameScore();
                this.flipBackTimer = new egret.Timer(2000, 1);
                this.flipBackTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);
                this.flipBackTimer.start();
            }
        }
        else {
            this.returnCards(null);
            this.firstCard = thisCard;
            var temp = thisCard.cardFace + 2;
            this.firstCard.startFlip(temp);
        }
    };
    GameApp.prototype.returnCards = function (e) {
        this.firstCard.startFlip(1);
        this.secondCard.startFlip(1);
        this.firstCard = null;
        this.secondCard = null;
        this.flipBackTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.returnCards, this);
    };
    GameApp.prototype.showTime = function (event) {
        this.gameTime = egret.getTimer() - this.gameStartTime;
        this.gameTimeField.text = "Time:  " + this.clockTime(this.gameTime);
    };
    GameApp.prototype.clockTime = function (ms) {
        var seconds = Math.floor(ms / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        var timeString = minutes + ":" + String(seconds + 100).substr(1, 2);
        return timeString;
    };
    GameApp.prototype.showGameScore = function () {
        this.gameScoreField.text = "Score:  " + String(this.gameScore);
    };
    GameApp.boardWidth = 6;
    GameApp.boardHeight = 6;
    GameApp.cardHorizontalSpacing = 52;
    GameApp.cardVerticalSpacing = 52;
    GameApp.boardOffsetX = 50;
    GameApp.boardOffsetY = 70;
    GameApp.pointsForMatch = 100;
    GameApp.pointsForMiss = -5;
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";

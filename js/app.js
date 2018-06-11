var Rabbit = require('./rabbit.js');
var Coin = require('./coin.js');

document.addEventListener("DOMContentLoaded", function(){

        var Game = function() {
            this.board = document.querySelectorAll("#board div");
            this.rabbit = new Rabbit();
            this.coin = new Coin();
            this.score = 0;
            var self = this;

            this.index = function (x, y) {
                return x + (y * 10);
            };

            this.showrabbit = function showRabbit() {
                this.hideVisibleRabbit();
                this.board[this.index(this.rabbit.x, this.rabbit.y)].classList.add('rabbit');
            };

            this.showCoin = function showCoin() {
                this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
            };

            this.startGame = function () {
                this.idInterval = setInterval(function () {
                    self.moveRabbit();
                }, 250);
            };

            this.moveRabbit = function () {
                if (this.rabbit.direction === "right") {
                    this.rabbit.x = this.rabbit.x + 1;
                }
                else if (this.rabbit.direction === "left") {
                    this.rabbit.x = this.rabbit.x - 1;
                }
                else if (this.rabbit.direction === "down") {
                    this.rabbit.y = this.rabbit.y + 1;
                }
                else if (this.rabbit.direction === "up") {
                    this.rabbit.y = this.rabbit.y - 1;
                }

            this.checkCoinCollision();
                var bool = this.gameOver();
                if(!bool) {
                    this.showrabbit();
                    this.showCoin();
                }
            };

            this.checkCoinCollision = function(){
                if(this.rabbit.x == this.coin.x && this.rabbit.y == this.coin.y){
                    var coin = document.querySelector(".coin");
                    coin.classList.remove('coin');
                    this.score ++;
                    this.coin = new Coin();
                    this.showCoin();
                    this.updateScore(this.score);
                }
            };

            this.gameOver = function () {
                if(this.rabbit.x < 0 || this.rabbit.x > 9 || this.rabbit.y < 0 || this.rabbit.y > 9 ){
                    clearInterval(this.idInterval);
                    alert("KONIEC GRY");
                    return true;
                }
            };


            this.hideVisibleRabbit = function () {
                var hide = document.querySelector(".rabbit");
                if(hide != null) {
                    hide.classList.remove("rabbit");
                }
            };

            this.turnRabbit = function(event) {
                switch (event.which) {
                    case 37:
                        this.rabbit.direction = "left";
                        break;
                    case 38:
                        this.rabbit.direction = "up";
                        break;
                    case 39:
                        this.rabbit.direction = "right";
                        break;
                    case 40:
                        this.rabbit.direction = "down";
                        break;

                }
            };

            this.updateScore = function(points){
                var score = document.querySelector("#score div strong");
                score.innerText = points;
            };

        };

        document.addEventListener('keydown', function (event) {
            play.turnRabbit(event);
        });

        var play = new Game();
        play.showrabbit();
        play.startGame();

    });

/*
var Furry = function() {
       this.x = 0;
       this.y = 0;
       this.direction = "right";
   };
   var Coin = function () {
       this.x = Math.floor(Math.random() * 10);
       this.y = Math.floor(Math.random() * 10);
   };

   var Game = function() {
   this.board = document.querySelectorAll("#board div");
   this.furry = new Furry();
   this.coin = new Coin();
   this.score = 0;

   this.index = function (x, y) {
       return x + (y * 10);
   };

   this.showfurry = function showFurry() {
       this.hideVisibleFurry();
       this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
   };
   this.showCoin = function showCoin() {
       this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
   };

   this.startGame = function () {
       var self = this;
       idInterval = setInterval(function () {
           self.moveFury();
       }, 750);
   };

   this.moveFury = function () {
       if (this.furry.direction === "right") {
           this.furry.x = this.furry.x + 1;
       }
       else if (this.furry.direction === "left") {
           this.furry.x = this.furry.x - 1;
       }
       else if (this.furry.direction === "down") {
           this.furry.y = this.furry.y + 1;
       }
       else if (this.furry.direction === "up") {
           this.furry.y = this.furry.y - 1;
       }
       this.checkCoinCollision();
       var bool = this.gameOver();
       if(!bool) {
           this.showfurry();
           this.showCoin();
       }
   };

   this.checkCoinCollision = function(){
       if(this.furry.x == this.coin.x && this.furry.y == this.coin.y){
           var coin = document.querySelector(".coin");
           coin.classList.remove('coin');
           this.score ++;
           this.coin = new Coin();
           this.showCoin();
           this.updateScore(this.score);
       }
   };

   this.gameOver = function () {
       if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9 ){
           clearInterval(idInterval);
           alert("GAME OVER!!!");
           return true;
       }
   };


   this.hideVisibleFurry = function () {
       var temp = document.querySelector(".furry");
       if(temp != null) {
           temp.classList.remove("furry");
       }
   };

   this.turnFurry = function(event) {
       switch (event.which) {
           case 37:
               this.furry.direction = "left";
               break;
           case 38:
               this.furry.direction = "up";
               break;
           case 39:
               this.furry.direction = "right";
               break;
           case 40:
               this.furry.direction = "down";
               break;

       }
   };

   this.updateScore = function(points){
       var score = document.querySelector("#score div strong");
       score.innerText = points;
   };

};

document.addEventListener('keydown', function (event) {
   one.turnFurry(event);
});

var one = new Game();
one.showfurry();
one.startGame();

});
 */
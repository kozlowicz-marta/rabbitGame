import Rabbit from './rabbit.js';
import Coin from './coin.js';

document.addEventListener("DOMContentLoaded", function () {

    class Game {
        constructor() {
            this.board = document.querySelectorAll("#board div");
            this.rabbit = new Rabbit();
            this.coin = new Coin();
            this.score = 0;
            let self = this;
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
                } else if (this.rabbit.direction === "left") {
                    this.rabbit.x = this.rabbit.x - 1;
                } else if (this.rabbit.direction === "down") {
                    this.rabbit.y = this.rabbit.y + 1;
                } else if (this.rabbit.direction === "up") {
                    this.rabbit.y = this.rabbit.y - 1;
                }

                this.checkCoinCollision();
                let bool = this.gameOver();
                if (!bool) {
                    this.showrabbit();
                    this.showCoin();
                }
            };
            this.checkCoinCollision = function () {
                if (this.rabbit.x == this.coin.x && this.rabbit.y == this.coin.y) {
                    let coin = document.querySelector(".coin");
                    coin.classList.remove('coin');
                    this.score++;
                    this.coin = new Coin();
                    this.showCoin();
                    this.updateScore(this.score);
                }
            };

            this.gameOver = function () {
                if (this.rabbit.x < 0 || this.rabbit.x > 9 || this.rabbit.y < 0 || this.rabbit.y > 9) {
                    clearInterval(this.idInterval);
                    alert("KONIEC GRY");
                    return true;
                }
            };

            this.hideVisibleRabbit = function () {
                let hide = document.querySelector(".rabbit");
                if (hide != null) {
                    hide.classList.remove("rabbit");
                }
            };
            this.turnRabbit = function (event) {
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
            this.updateScore = function (points) {
                let score = document.querySelector("#score div strong");
                score.innerText = points;
            };
        }
    }

    document.addEventListener('keydown', function (event) {
        play.turnRabbit(event);
    });

    let play = new Game();
    play.showrabbit();
    play.startGame();

});
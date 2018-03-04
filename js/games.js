const games = (function(){

  const game = {};

  game.Game = function(players){
      this.board = 'xxxxxxxxx';
      this.boxes = null;
      this.players = players;
      this.index = 0;
      this.turns = 0;
      this.currentPlayer = this.players[this.index];
  };

  game.Game.prototype.start = function () {
    utils.HTMLControl(0);
    const startButton = document.querySelector('.button');
    const p1input = document.querySelector('#player-1 input');
    const p2input = document.querySelector('#player-2 input');
    const alertP = document.querySelector('#alertP');
    p1input.focus();
    startButton.addEventListener('click', () => {
      if(p1input.value === '' && p2input.value === ''){
        alertP.textContent = 'Please enter 1 or 2 names';
        return;
      } else if(p1input.value === '' && p2input.value !== ''){
        alertP.textContent = 'Please enter a name for Player 1';
        return;
      } else if(p1input.value !== '' && p2input.value === ''){
        this.players[0].name = p1input.value;
        this.players[1].name = 'Computer';
        this.players[1].cpu = true;
        this.players[1].choice = null;
      } else {
        this.players[0].name = p1input.value;
        this.players[1].name = p2input.value;
      }
      this.play();
    });
  };

  game.Game.prototype.play = function () {
    utils.HTMLControl(1);
    this.boxes = [...document.querySelectorAll('.box')];
    this.players[0].el = document.querySelector('#player1');
    this.players[1].el = document.querySelector('#player2');
    this.players[0].img = 'img/o.svg';
    this.players[1].img = 'img/x.svg';
    const p1name = document.querySelector('#name-div p:first-of-type');
    const p2name = document.querySelector('#name-div p:last-of-type');
    p1name.textContent = this.players[0].name;
    p2name.textContent = this.players[1].name;
    this.players[0].el.classList.toggle('active');
    let boxes = document.querySelector('.boxes');
    boxes.addEventListener('mouseover', (e) => this.hoverCtrl(e));
    boxes.addEventListener('mouseout', (e) => this.hoverCtrl(e));
    boxes.addEventListener('click', (e) => this.markXorO(e));
  };

  game.Game.prototype.hoverCtrl = function (e) {
    if(e.target.classList.length > 1){return;}
    if(e.type === 'mouseover'){
      e.target.style.backgroundImage = `url(${this.currentPlayer.img})`;
    } else {
      e.target.style.backgroundImage = `none`;
    }
  };

  game.Game.prototype.markXorO = function (e) {
    let sq = null;
    if(typeof e === 'object'){
      sq = e.target;
    } else {
      sq = this.boxes[e];
      sq.style.backgroundImage = `url(${this.currentPlayer.img})`;
    }
    if(sq.classList.length > 1){return;}
    sq.classList.add(`box-filled-${this.index + 1}`);
    let index = this.boxes.indexOf(sq);
    this.board = this.board.substring(0,index) + (this.index + 1) + this.board.substring(index + 1);
    this.players.forEach(x => x.el.classList.toggle('active'));
    this.turns++;
    if(this.turns > 4){
      if(this.checker(this.board)){
        this.endScreen(this.index + 1, this.currentPlayer.name);
      } else {
        if(this.turns === 9){
          this.endScreen();
        }
      }
    }
    this.index = 1 - this.index;
    this.currentPlayer = this.players[this.index];
    if(this.currentPlayer.cpu){
      if(this.turns === 1 && this.board === 'xxxx1xxxx'){
        this.markXorO([0,2,6,8][Math.floor(Math.random() * 4)]);
      } else {
        this.minimax(this.board, true, this.turns);
        this.markXorO(this.players[1].choice);
      }
    }
  };

  game.Game.prototype.score = function (board, bool, depth) {
    if(this.checker(board)){
      if(!bool){
        return 10 - depth;
      } else {
        return depth - 10;
      }
    } else {
      if(!board.includes('x')){
        return 0;
      }
    }
  };

  game.Game.prototype.minimax = function (board, bool, depth) {
    if(this.checker(board)){
      return this.score(board, bool, depth);
    } else {
      if(!board.includes('x')){
        return this.score(board, bool, depth);
      }
    }
    depth++;
    if(bool){
      let bestValue = Number.MIN_SAFE_INTEGER;
      board.split('').forEach((x,i) => {
        if(x === 'x'){
          let val = this.minimax(utils.getNewState(board, i, bool), false, depth);
          if(val > bestValue){
            bestValue = val;
            this.players[1].choice = i;
          }
        }
      });
      return bestValue;
    } else {
      let bestValue = Number.MAX_SAFE_INTEGER;
      board.split('').forEach((x,i) => {
        if(x === 'x'){
          let val = this.minimax(utils.getNewState(board, i, bool), true, depth);
          if(val < bestValue){
            bestValue = val;
            this.players[1].choice = i;
          }
        }
      });
      return bestValue;
    }
  };

  game.Game.prototype.checker = function (board) {
    return utils.wins.some(x => x.test(board));
  };

  game.Game.prototype.endScreen = function (index, name) {
      utils.HTMLControl(2);
      const div = document.querySelector('#finish');
      const p = document.querySelector('.message');
      const sp = document.querySelector('span');
      const button = document.querySelector('.button');
      if(index){
        div.classList.add(`screen-win-${index}`);
        p.textContent = `Winner:`;
        sp.textContent = `${name}!`;
      } else {
        div.classList.add(`screen-win-tie`);
        p.textContent = "It's a Tie!";
      }
      button.addEventListener('click', function (e) {
        let theplayers = [new players.Player(), new players.Player()];
        let agame = new games.Game(theplayers);
        agame.start();
      });
  };

  return game;
}());

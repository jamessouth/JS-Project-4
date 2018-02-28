function HTMLControl(index){
  const div = document.querySelector('div');

  const pages = [
    '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>',
    '<div class="board" id="board"><header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul></div>'
  ];
  div.innerHTML = pages[index];
}



function Player(name){
  this.name = name;
  this.el = null;
  this.img = null;
}

function Game(players){
    // pages('board');
    // this.board = document.querySelector('.boxes');
    // this.board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
    this.board = null;
    this.players = players;
    this.index = 0;
    this.turns = 0;
    this.currentPlayer = this.players[this.index];
    this.finished = false;
}

Game.prototype.start = function () {
  HTMLControl(0);
  const startButton = document.querySelector('.button');
  startButton.addEventListener('click', () => this.play());
}

Game.prototype.play = function () {
  HTMLControl(1);
  // console.log(this);
  this.board = [...document.querySelectorAll('.box')];

  this.players[0].el = document.querySelector('#player1');
  this.players[1].el = document.querySelector('#player2');
  this.players[0].img = 'img/o.svg';
  this.players[1].img = 'img/x.svg';
  // console.log(this.players[0]);
  this.players[0].el.classList.toggle('active');
  let boxes = document.querySelector('.boxes');
  // console.log(boxes[0].parentNode);
  boxes.addEventListener('mouseover', (e) => this.hoverCtrl(e));
  boxes.addEventListener('mouseout', (e) => this.hoverCtrl(e));
  boxes.addEventListener('click', (e) => this.markXorO(e));

}

Game.prototype.hoverCtrl = function (e) {
  // console.log(e.target, this.currentPlayer);
  // console.log(e.target.classList);
  if(e.target.classList.length > 1){return;}

  if(e.type === 'mouseover'){
    e.target.style.backgroundImage = `url(${this.currentPlayer.img})`;
  } else {
    e.target.style.backgroundImage = `none`;
  }
}

Game.prototype.markXorO = function (e) {
  // console.log(e, this);
  if(e.target.classList.length > 1){return;}
  e.target.classList.add(`box-filled-${this.index + 1}`);
  this.index = 1 - this.index;
  this.currentPlayer = this.players[this.index];
  // console.log(e.target.className);
  this.players.forEach(x => x.el.classList.toggle('active'));
  this.turns++;
  console.log(this.board, this.turns);
  if(this.turns > 4){
    console.log(this.checker(this.board));
  }

}

Game.prototype.checker = function (board) {
  let wins = [/^(\d)\1{2}.+/, /.{3}(\d)\1{2}.{3}/, /.+(\d)\1{2}$/];
  let brd = board.reduce((str, box) => {
    return str + box.className[box.className.length - 1];
  }, '');
  return wins.some(x => x.test(brd));

}



!function(){

  let players = [new Player('jo'), new Player('lex')];
  let game = new Game(players);
  game.start();
}();

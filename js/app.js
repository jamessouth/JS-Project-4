function HTMLControl(index){
  const div = document.querySelector('div');

  const pages = [
    '<div class="screen screen-start" id="start"><div id="name-holder"><label id="player-1">Player 1<input placeholder="Enter name" type="text"/></label><label id="player-2">Player 2<input placeholder="Enter name" type="text"/></label></div><p id="alertP"></p><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>',
    '<div class="board" id="board"><header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><div id="name-div"><p></p><p></p></div><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul></div>',
    '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><span></span><a href="#" class="button">New game</a></header></div>'
  ];
  div.innerHTML = pages[index];
}



function Player(){
  this.name = null;
  this.el = null;
  this.img = null;
}

function Game(players){
    // pages('board');
    // this.board = document.querySelector('.boxes');
    // this.board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
    this.board = 'xxxxxxxxx';
    this.boxes = null;
    this.players = players;
    this.index = 0;
    this.turns = 0;
    this.currentPlayer = this.players[this.index];
    this.finished = false;
}

Game.prototype.start = function () {
  HTMLControl(0);
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
    } else {
      this.players[0].name = p1input.value;
      this.players[1].name = p2input.value;
    }

    console.log(this.players[0], this.players[1]);

    this.play();
  });
}

Game.prototype.play = function () {
  HTMLControl(1);
  // console.log(this);
  this.boxes = [...document.querySelectorAll('.box')];

  // this.board = this.board.reduce((str, box) => {
  //   return str + box.className[box.className.length - 1];
  // }, '');



  this.players[0].el = document.querySelector('#player1');
  this.players[1].el = document.querySelector('#player2');
  this.players[0].img = 'img/o.svg';
  this.players[1].img = 'img/x.svg';
  const p1name = document.querySelector('#name-div p:first-of-type');
  const p2name = document.querySelector('#name-div p:last-of-type');
  p1name.textContent = this.players[0].name;
  p2name.textContent = this.players[1].name;
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

  let index = this.boxes.indexOf(e.target);
  this.board = this.board.substring(0,index) + (this.index + 1) + this.board.substring(index + 1);

  // console.log(e.target);
  this.players.forEach(x => x.el.classList.toggle('active'));
  this.turns++;
  console.log(this.currentPlayer, this.index);
  console.log(this.board);
  if(this.turns > 4){
    if(this.checker(this.board)){
      console.log(`${this.index} wins`);
      this.endScreen(this.index + 1, this.currentPlayer.name);
    } else {
      console.log(this.turns);
      if(this.turns === 9){
        console.log('draw');
        this.endScreen();
      }
    }
  }

  this.index = 1 - this.index;
  this.currentPlayer = this.players[this.index];
  if(this.index == 1 && this.turns > 6){
    console.log(this.minimax(this.board));
  }
}


Game.prototype.score = function (board, index) {
  if(this.checker(board)){
    if(index == 2){
      return 10;
    } else {
      return -10;
    }
  } else {
    if(!board.includes('x')){
      return 0;
    }
  }
}


let player = 1, choice = null;

Game.prototype.minimax = function (board) {
  debugger;
  let scores = [], moves = [];
  player = 3 - player;
  // console.log(player);
  if(this.checker(board)){
    return this.score(board, player);
  } else {
    if(!board.includes('x')){
      return this.score(board, player);
    }
  }

  board.split('').forEach((x,i) => {
    if(x === 'x'){
      let possibleGame = this.getNewState(board, i, player);
      scores.push(this.minimax(possibleGame));
      moves.push(i);
    }
  });
  console.log(board, scores, moves);
  if(player == 2){
    let maxScore = Math.max(...scores);
    choice = moves[scores.indexOf(maxScore)];
    return [maxScore, choice];
  } else {
    let minScore = Math.min(...scores);
    choice = moves[scores.indexOf(minScore)];
    return [minScore, choice];
  }




}

Game.prototype.getNewState = function (board, ind, player) {
  return board.substring(0,ind) + (player) + board.substring(ind + 1);
}


Game.prototype.checker = function (board) {
  // console.log('run');
  let wins = [/^(\d)\1\1.+/, /...(\d)\1\1.../, /.+(\d)\1\1$/, /(\d)..\1..\1../, /.(\d)..\1..\1./, /..(\d)..\1..\1/, /(\d)...\1...\1/, /..(\d).\1.\1../];
  // let brd = board.reduce((str, box) => {
  //   return str + box.className[box.className.length - 1];
  // }, '');
  return wins.some(x => x.test(board));

}

Game.prototype.endScreen = function (index, name) {
    HTMLControl(2);
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
      console.log(e);
      let players = [new Player(), new Player()];
      let game = new Game(players);
      game.start();
    });
}



!function(){

  let players = [new Player(), new Player()];
  let game = new Game(players);
  game.start();
}();


// function glbls(){
//
// var differences = {},
//     exceptions,
//     globals = {},
//     ignoreList = (prompt('Ignore filter (comma sep)?', '') || '').split(','),
//     i = ignoreList.length,
//     iframe = document.createElement('iframe');
// while (i--) {
//   globals[ignoreList[i]] = 1
// }
// for (i in window) {
//   differences[i] = {
//     'type': typeof window[i],
//     'val': window[i]
//   }
// }
// iframe.style.display = 'none';
// document.body.appendChild(iframe);
// iframe.src = 'about:blank';
// iframe = iframe.contentWindow || iframe.contentDocument;
// for (i in differences) {
//   if (typeof iframe[i] != 'undefined') delete differences[i];
//   else if (globals[differences[i].type]) delete differences[i]
// }
// exceptions = 'addEventListener,document,location,navigator,window'.split(',');
// i = exceptions.length;
// while (--i) {
//   delete differences[exceptions[i]]
// }
// console.dir(differences);
// }

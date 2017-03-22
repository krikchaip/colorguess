// Create game objects //
let game = new GuessRGB();
let diffButtons = {};

// create game buttons //
document.getElementById('newgame')
  .addEventListener('click',() => game.reset());

diffButtons['easy'] = {obj: document.getElementById('mode-easy'), val: 3};
diffButtons['normal'] = {obj: document.getElementById('mode-normal'), val: 6};

for (let mode in diffButtons) {
  diffButtons[mode].obj.addEventListener('click', function () {
    game.difficulty = this.val;
    this.obj.classList.add('selected-mode');
    for (let me in diffButtons)
      if (mode !== me)
        diffButtons[me].obj.classList.remove('selected-mode');
  }.bind(diffButtons[mode]));
}

// Initialize //
document.getElementById('mode-normal').click();
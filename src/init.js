// Create game objects //
let game = new GuessRGB();

// create game buttons //
makeClickEventById(() => game.reset(), 'newgame');
makeClickEventById(() => game.difficulty = 3, 'mode-easy');
makeClickEventById(() => game.difficulty = 6, 'mode-normal');
makeClickEventById(() => game.difficulty = 9, 'mode-hard');

// Initialize //
document.getElementById('mode-easy').click();
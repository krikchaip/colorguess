// Create game objects //
var tiles = new Tiles('.container');
var answer = new Answer('answer');

// Create game buttons //
var newgameButton = document.getElementById('newgame');
newgameButton.addEventListener('click', function () {
	tiles.resetColor();
	answer.pickFrom(tiles.get());
});
var easyModeButton = document.getElementById('mode-easy');
easyModeButton.addEventListener('click', function () {
	tiles.setUpdate(3, answer);
});
var normalModeButton = document.getElementById('mode-normal');
normalModeButton.addEventListener('click', function () {
	tiles.setUpdate(6, answer);
});
var hardModeButton = document.getElementById('mode-hard');
hardModeButton.addEventListener('click', function () {
	tiles.setUpdate(9, answer);
});

// Initialize //
easyModeButton.click();
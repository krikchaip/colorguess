//+++ Global Functions +++//
/**
 * Returns a string of RGB in 'rgb(a,b,c)' format.
 */
function getRGB () {
	var f = function () {return Math.floor(Math.random() * 256);}
	return 'rgb' + '(' + f() + ',' + f() + ',' + f() + ')';
}

//+++ Classes +++//
// TODO: hide-when-click function
function Tiles () {
	var container = document.querySelector('.container');
	var tilesList = container.children;

	this.get = function () {return tilesList;};
	this.getContainer = function () {return container;}
	this.setAndUpdate = function (value, update) {
		if (container.childElementCount !== value) {
			var inject = '';
			for (var i = 0; i < value; i++) {
				inject += '<div class="color-box" id="box'+(i+1)+'"></div>';
			}
			container.innerHTML = inject;
			for (var i = 0; i < tilesList.length; i++) {
				tilesList[i].style.backgroundColor = getRGB();
			}
			update(tilesList);
		}
	};
	this.resetColor = function () {
		for (var i = 0; i < tilesList.length; i++) {
			tilesList[i].style.backgroundColor = getRGB();
		}
	};
}

function Answer () {
	var value = undefined;
	var display = document.getElementById('answer');

	this.get = function () {return value;};
	this.pickFrom = function (item) {
		value = item[Math.floor(Math.random() * item.length)].style.backgroundColor;
		display.textContent = value;
	};
}

//+++ Setup +++//
// Create game objects //
var tiles = new Tiles();
var answer = new Answer();

// Create game buttons //
var newgameButton = document.getElementById('newgame');
newgameButton.addEventListener('click', function () {
	tiles.resetColor();
	answer.pickFrom(tiles.get());
});
var easyModeButton = document.getElementById('mode-easy');
easyModeButton.addEventListener('click', function () {
	tiles.setAndUpdate(6, answer.pickFrom);
});
var normalModeButton = document.getElementById('mode-normal');
normalModeButton.addEventListener('click', function () {
	tiles.setAndUpdate(9, answer.pickFrom);
});
var hardModeButton = document.getElementById('mode-hard');
hardModeButton.addEventListener('click', function () {
	tiles.setAndUpdate(12, answer.pickFrom);
});

// Initialize //
easyModeButton.click();
newgameButton.click();
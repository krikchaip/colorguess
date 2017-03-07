// [Global Functions] //
/**
 * Returns a string of RGB in 'rgb(a,b,c)' format.
 */
function getRGB () {
	var f = function () {return Math.floor(Math.random() * 256);}
	return 'rgb' + '(' + f() + ',' + f() + ',' + f() + ')';
}

// [Classes] //
/**
 * Represents game's tiles
 */
function Tiles () {
	var container = document.querySelector('.container');
	var tilesList = container.children;

	this.get = function () {return tilesList;};
	this.setUpdate = function (value, updateObj) {
		if (container.childElementCount !== value) {
			var inject = '';
			for (var i = 0; i < value; i++) {
				inject += '<div class="color-box" id="box'+(i+1)+'"></div>';
			}
			container.innerHTML = inject;
			this.resetColor();
			updateObj.pickFrom(tilesList);
			this.gameControl(updateObj);
		}
	};
	this.resetColor = function () {
		for (var i = 0; i < tilesList.length; i++) {
			tilesList[i].style.backgroundColor = getRGB();
		}
	};
	// TODO: Implement more gameControl!	
	this.gameControl = function (gameAnswer) {
		for (var i = 0; i < tilesList.length; i++) {
			var element = tilesList[i];
			element.addEventListener('click', function () {
				if (this.style.backgroundColor == gameAnswer.get()) {
					console.log('You win!');
				} else {
					console.log('Wrong!');
					this.style.backgroundColor = 'rgb(35,35,35)';
				}
			});
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
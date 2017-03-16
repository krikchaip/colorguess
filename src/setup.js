// Global Functions // 
function randPosInt (max) {
	return Math.floor(Math.random() * max)
}

function rgbGenerator (RNG = randPosInt) {
	let [R, G, B] = [RNG(256), RNG(256), RNG(256)];
	return `RGB(${R},${G},${B})`
}

function removeAllChild (parentNode) {
	while (parentNode.hasChildNodes())
		parentNode.removeChild(parentNode.firstChild);
}

function makeClickEventById (ev, id) {
	document.getElementById(id).addEventListener('click', ev);
}

// Class //
const GuessRGB = (function () {
  // Private Variables
	let current = 0;

	let answer = document.querySelector('.answer');
	let status = document.querySelector('.status');

	let container = document.querySelector('.container');
	const tilesArray = () => Array.prototype.slice.call(container.children);

	// Private Functions
	function resetColor () {
		let arr = tilesArray();
		arr.forEach(tile => tile.style.backgroundColor = rgbGenerator());
		return arr[randPosInt(current)].style.backgroundColor
	}

	function createEvent () {
		tilesArray().forEach(tile => { 
			tile.removeEventListener('click', event);
			tile.addEventListener('click', event);
		});
	}

	function event () {
		let color = this.style.backgroundColor;
		let correct = answer.textContent;

		if (color === correct) {
			status.textContent = 'Correct!';
			tilesArray().forEach(tile => {
				tile.style.backgroundColor = color;
				tile.removeEventListener('click', event);
			});
		} else {
			status.textContent = 'Wrong!';
			this.style.backgroundColor = 'RGB(35,35,35)';
			this.removeEventListener('click', event);
		}
	}

  // Public scope
  return class { 
		set difficulty (value) {
			if (current === value) return
			current = value;
			removeAllChild(container);
			
			let children = ``;
			for (let i = 0; i < current; i++)
				children += `<div class='color-box' id='box${i + 1}'></div>`
			container.innerHTML = children;

			this.reset();
		}

		reset () {
			answer.textContent = resetColor();
			status.textContent = '';
			createEvent();
		}
	}
})();
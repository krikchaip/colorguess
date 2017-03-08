// [Global Functions] //
	/**
	 * Random a number from 0-255.
	 */
	const byteGenerator = function () {return Math.floor(Math.random() * 256)};
	/**
	 * Make a string in 'RGB(a,b,c)' format.
	 */
	const makeRGB = function (RNG) {
		return function () {return 'RGB'+'('+RNG()+','+RNG()+','+RNG()+')'}
	};
	/**
	 * Generate a random RGB color.
	 */
	const rgbGenerator = makeRGB(byteGenerator);

// [Classes] //
	/**
	 * Represents game's tiles
	 */
	function Tiles (containerName) {
		var container = document.querySelector(containerName);

		this.get = function () {return [].slice.call(container.children)};
		this.resetColor = function () {
			this.get().forEach(function (element) {
				element.style.backgroundColor = rgbGenerator();
			});
		};
		this.setUpdate = function (value, updateObj) {
			if (this.get().length !== value) {
				container.innerHTML = '';
				for (var i = 0; i < value; i++) {
					container.innerHTML 
						+= '<div class="color-box" id="box'+(i+1)+'"></div>';
				}
				this.resetColor();
				updateObj.pickFrom(this.get());
				this.gameControl(updateObj);
			}
		};
		// TODO: Implement more gameControl!	
		this.gameControl = function (gameAnswer) {
			var get = this.get;
			get().forEach(function (element) {
				var answer = gameAnswer;
				var getTilesList = get;
				element.addEventListener('click', function () {
					var tilesList = getTilesList();
					if (this.style.backgroundColor == answer.get()) {
						console.log('You win!');
						tilesList.forEach(function (element) {
							element.style.backgroundColor = answer.get();	
						});
					} else {
						console.log('Wrong!');
						this.style.backgroundColor = 'rgb(35,35,35)';
					}
				});
			});
		};
	}

	function Answer (displayID) {
		var value = undefined;
		var display = document.getElementById(displayID);

		this.get = function () {return value;};
		this.pickFrom = function (item) {
			value = item[Math.floor(Math.random() * item.length)].style.backgroundColor;
			display.textContent = value;
		};
	}
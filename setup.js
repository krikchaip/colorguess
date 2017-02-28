/*----- Global Variables -----*/
// enter button id
var startmode = 'mode-easy';

/*----- Independent Functions -----*/
	function rgb_generator(fn) {
		if (fn == undefined) {
			fn = function () {
				var f = function () { return Math.floor(Math.random() * 256); }
				return 'rgb'+'('+f()+','+f()+','+f()+')';  
			};
		}
		return fn();
	}

/*------------------------------*/
var Tiles = {
	'item' : undefined,
	'container' : document.querySelector('.container'),
	'set_to' : function (count) {
		if (this.container.childElementCount !== count) {
			this.container.innerHTML = '';
			var inject = '';
			for (var i = 0; i < count; i++) {
				inject += '<div class="color-box" id="box'+(i+1)+'"></div>';
			}
			this.container.innerHTML = inject;

			delete this.item;
			this.item = this.container.children;
		}
	},
	'set_color' : function () {
		for (var i = 0; i < this.item.length; i++) {
			this.item[i].style.backgroundColor = rgb_generator();
		}
	}
};

var Answer = {
	'value' : undefined, 
	'object' : document.getElementById('answer'),
	'pick' : function () {
		return Tiles.item[Math.floor(Math.random() * Tiles.item.length)].style.backgroundColor;
	},
	'update' : function () {
		this.value = this.pick();
		this.object.textContent = this.value;
	}
};

var Button = {
	'button' : {},
	'nowclick' : function (button_name) {
		if (button_name != 'newgame') {
			this.initiate();
			this.button[button_name].setActive(false);
		}
		console.log(button_name);
		return button_name;
	},
	'make_button' : function (name, event) {
		// create Button name = (name)
		this.button[name] = {
			'obj' : document.getElementById(name),
			'action' : [
				event,
				function () {
					Button.nowclick(name);
					Tiles.set_color();
					Answer.update();
				}
			],
			'setActive' : function (option) {
				if (option)
					for (var i = 0; i < this.action.length; i++)
						this.obj.addEventListener('click', this.action[i]);
				else 
					for (var i = 0; i < this.action.length; i++)
						this.obj.removeEventListener('click', this.action[i]);
			}
		}; // end this[name]
	}, // end 'make_button'
	'initiate' : function (startmode) {
		if (startmode == undefined) startmode = 'mode-easy';
		for (key in this.button)
			this.button[key].setActive(true);
	}
};

/* Execution Steps */
	(function () {
		Button.make_button('newgame', undefined);
		Button.make_button('mode-easy', function () { Tiles.set_to(3); });
		Button.make_button('mode-normal', function () { Tiles.set_to(6); });
		Button.make_button('mode-hard', function () { Tiles.set_to(9); });

		Button.initiate(startmode);
		Button.button[startmode].obj.click();
	})();
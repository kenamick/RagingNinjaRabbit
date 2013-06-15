define(["src/config.js"], function(config) {


	// character animation 
	Crafty.c('CharAnims', {
		CharAnims: function() {
			// setup animations sequences
			this.requires("SpriteAnimation, Grid, Collision")
			.animate("walk_left", [ [0, 96], [32, 96], [64, 96] ])
			.animate("walk_right", [ [0, 144], [32, 144], [64, 144] ])
			.animate("walk_up", [ [0, 48], [32, 48], [64, 48] ])
			.animate("walk_down", [ [0, 0], [32, 0], [64, 0] ]);
		return this;
		}
	});

	function Player(x, y) {
		var self = this;

		self.x = x;
		self.y = y;
	}

	Player.prototype.create = function() {

		// create character
		var entity = Crafty.e("2D, DOM, player, CharAnims, Multiway, MouseFace")
		.attr({
			move: {left: false, right: false, up: false, down: false},
			x: this.x, y: this.y, z: 1,
			moving: false
		})
		.CharAnims()
		.bind("Moved", function(from) {
			this.moving = true;

			// Hit!
			if( this.hit('Obstacle') ) {
				this.attr({x: from.x, y:from.y});
			}
		})
		.bind("EnterFrame", function() {
			// If moving, adjust the proper animation and facing
			if (this.moving) {
				var anim = null;
				switch(this.getDirection()) {
				case this._directions.left:
					anim = 'walk_left';
					break;
				case this._directions.right:
					anim = 'walk_right';
					break;
				case this._directions.up:
					anim = 'walk_up';
					break;
				case this._directions.down:
					anim = 'walk_down';
					break;
				}

				if (anim) {
					if (!this.isPlaying(anim))
						this.stop().animate(anim, 8, -1); 
				}

				this.moving = false;
			} else {
				this.stop();
			} 
		})
		.multiway(2, {W: -90, S: 90, D: 0, A: 180})
		.collision( [4, 30], [28, 30], [28, 48], [4, 48]);	

		this.entity = entity;
	};

	Player.prototype.getEntity = function() {
		return this.entity;
	};

	return {
		create: function(x, y) {
			return new Player(x, y);
		}
	};

});
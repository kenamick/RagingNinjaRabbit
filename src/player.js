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
		var self = this;

		// create character
		var entity = Crafty.e("2D, " + config.screen.render + ", player, CharAnims, Multiway, MouseFace")
		.attr({
			move: {left: false, right: false, up: false, down: false},
			x: this.x, y: this.y, z: 1,
			speed: 2.5,
			anim_speed: 5,
			moving: false,
			goal: {reached: true, x: 0, y: 0}
		})
		.CharAnims()
		.bind("EnterFrame", function() {

			if (!this.goal.reached) {

				var x = this.x;
				var y = this.y;
				var oldx = x;
				var oldy = y;
				var cx = this.x + this.w / 2;
				var cy = this.y + this.h / 2;

				if (Math.abs(cx - this.goal.x) > 0.75) {
					if (cx < this.goal.x) {
						x += this.speed;
					} else if (cx > this.goal.x) {
						x -= this.speed;
					}
				}

				if (Math.abs(cy - this.goal.y) > 0.95) {
					if (cy < this.goal.y) {
						y += this.speed;
					} else if (cy > this.goal.y) {
						y -= this.speed;
					}
				}

				this.moving = true;

				var distx = this.goal.x - cx;
				var disty = this.goal.y - cy;
				if ((distx * distx + disty * disty) < 100) {
					this.goal.reached = true;			
				}

				this.attr({x: x, y: y});

				// Hit obstacle
				if( this.hit('Obstacle') ) {
					this.goal.reached = true;

					this.attr({x: oldx, y: oldy});
				}

				// Hit portal
				var portals = this.hit('Portal');
				if (portals) {
					this.goal.reached = true;

					//console.log('portal %s', portals[0].obj.tiledprops.toPortal);
					var portal = portals[0].obj.tiledprops;

					// TODO: trigger event
					_Globals.player.currentRoom.fromPortal = portal.id;
					_Globals.player.currentRoom.name = 'room' + portal.toRoom;
					_Globals.player.currentRoom.toPortal = portal.toPortal;

					Crafty.scene('game');
				}
			}

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
						this.stop().animate(anim, this.anim_speed, -1); 
				}

				this.moving = false;
			} else {
				this.stop();
			}
			
		})
		.bind("MouseUp", function(event) {
			this.goal.x = event.realX;
			this.goal.y = event.realY;
			this.goal.reached = false;
		})
		//.multiway(2, {W: -90, S: 90, D: 0, A: 180})
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
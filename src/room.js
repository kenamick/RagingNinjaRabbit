define(["src/config.js"], function(config) {


	function Room(id) {
		var self = this;

		self.id = id;
		self.room = config.gameplay.rooms["" +self.id];

		// defaults
		self.playerX = 0;
		self.playerY = 0;
	}

	Room.prototype.load = function(callback) {
		var self = this;

		$('#loading').html('Entering ' + this.room.name + ' ...');
		$.getJSON(this.room.file, function(json) {

			Crafty.e("2D, " + config.screen.render + ", TiledMapBuilder").setMapDataSource(json)
			.createWorld( function( map ) {
					//Obstacles
					for (var obstacle = 0; obstacle < map.getEntitiesInLayer('Object Layer 1').length; obstacle++) {
						var entity = map.getEntitiesInLayer('Object Layer 1')[obstacle];

						if (entity.rName == 'col') {
							entity = entity.addComponent("Collision, Obstacle").collision();
						} else if (entity.rName == 'portal') {
							entity = entity.addComponent("Collision, Portal").collision();
						} else if (entity.rName == 'warp') {
							console.log(entity);
							self.PlayerX = entity.x;
							self.PlayerY = entity.y;
						}	
					}
				});

			$('#loading').hide();

			// notify
			callback({x: self.PlayerX, y: self.PlayerY});
		});		
	};

	return {
		create: function(id) {
			return new Room(id);
		}
	};
});
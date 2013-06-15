define(["src/config.js", "src/room.js", "src/player.js"], function(config, Room, Player) {
	Crafty.scene("game", function() {

		// show FPS
        Crafty.e("2D, " + config.screen.render + ", FPS, Persist").attr({maxValues:10})
        .bind("MessureFPS", function(fps) {
            $('#fps').text('FPS: ' + fps.value);
        });

		_Globals.startroom = 'room1';

		var room = Room.create(_Globals.startroom);

		// load room
		room.load(function(warpAt) {

			// done, now show player at warp position
			var player = Player.create(warpAt.x, warpAt.y);
			player.create();


		});


	});
});
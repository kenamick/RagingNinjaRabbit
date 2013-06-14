define([], function() {


	Crafty.scene("game", function() {

		$('#loading').html('Loading Room 1 ...');

		$.getJSON("data/room1.json", function(json) {

			Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource(json)
			.createWorld( function( map ){
			    console.log("done");
			    });	

			$('#loading').hide();
		});		

        // show FPS
        Crafty.e("2D, DOM, FPS").attr({maxValues:10})
        .bind("MessureFPS", function(fps) {
            $('#fps').text('FPS: ' + fps.value);
        });



	});

});
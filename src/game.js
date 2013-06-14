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



	});

});
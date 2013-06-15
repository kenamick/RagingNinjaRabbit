require(["src/config.js", "src/game.js"], function(config) {
    
    /**
     * Init Crafty Engine
     */
    Crafty.init(config.screen.width, config.screen.height).canvas.init();
    Crafty.background('transparent');

    /**
     * Load assets
     */
    Crafty.scene("loading", function() {
        Crafty.load([
            "art/stuz_rabbit.png",
            "art/stuz_enemy.png",

            "art/tiles1.png",
            "art/tiles2.png",
            "art/tiles3.png"
            ], 
        function() {
            // --- Graphics
            Crafty.sprite("art/stuz_rabbit.png", {
			    player: [0, 0, 32, 48],
		    });
            Crafty.sprite("art/stuz_enemy.png", {
    		    enemy: [0, 0, 32, 48],
		    });


            // Static initializations

            _Globals.currentRoom = 'room1';
            _Globals.player = {};
            
            // Load game scene

		    Crafty.scene('game');
            
            // disable loading
            //$('#loading').hide();
        },
        // On Progress
        function(e) {
            // console.log(e);
            //$('#loading').html('Loaded: ' + e.percent.toFixed(0) + '%');
        },
        // On Error
        function(e) {
            console.log(e);       
        });

        $('#loading').html('Loading Graphics ...');
        $('#loading').show();
    });
    
        
    Crafty.scene("loading");
    
});
/**
 * Raging Ninja Rabbit - 2D RPG demo
 * https://github.com/petarov/pin-code
 */

require(["src/config.js", "src/game.js"], function(config) {
    
    /**
     * Init Crafty Engine
     */
    Crafty.init(config.screen.width, config.screen.height).canvas.init();
    Crafty.background('transparent');

    // Render to Canvas for Chrom
    //var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    //var is_ipad = navigator.userAgent.toLowerCase().indexOf('ipad') > -1;
    //if (is_chrome || is_ipad) {
    //    config.screen.render = 'Canvas';
    //}

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
            _Globals.player = {
                currentRoom: {
                    name: 'room1',
                    fromPortal: null,
                    toPortal: null
                }
            };
            
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
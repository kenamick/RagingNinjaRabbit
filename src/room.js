/**
 * Raging Ninja Rabbit - 2D RPG demo
 * https://github.com/petarov/pin-code
 */

define(["src/config.js"], function(config) {


    function Room(id) {
        var self = this;

        self.id = id;
        self.room = config.gameplay.rooms["" +self.id];

        // self.portals = [];
        // self.obstacles = [];

        // defaults
        self.playerWarpFound = false;
        self.playerX = 0;
        self.playerY = 0;
    }

    Room.prototype.load = function(callback) {
        var self = this;

        $('#loading').show();
        $('#loading').html('Entering ' + this.room.name + ' ...');

        $.getJSON(this.room.file, { "noCache": config.server.nocache }, function(json) {

            Crafty.e("2D, " + config.screen.render + ", TiledMapBuilder").setMapDataSource(json)
            .createWorld( function( map ) {
                    //Obstacles
                    for (var obstacle = 0; obstacle < map.getEntitiesInLayer('Object Layer 1').length; obstacle++) {
                        var entity = map.getEntitiesInLayer('Object Layer 1')[obstacle];

                        if (entity.rName == 'col') {
                            entity = entity.addComponent("Collision, Obstacle").collision();
                        } else if (entity.rName == 'portal') {
                            entity = entity.addComponent("Collision, Portal").collision();

                            // check if this is the portal player warped to
                            if (_Globals.player.currentRoom.toPortal == entity.tiledprops.id) {
                                console.log('warped from portal ' + entity.tiledprops.id);
                                //console.log('entity ', entity.x, entity.y, entity.w, entity.h);
                                self.PlayerX = (entity.x + entity.w / 2);
                                self.PlayerY = (entity.y);

                                // stupid hack that would prevent the player from immediatelly 
                                // colliding with the portal he warped to
                                if (entity.y < 350) {
                                    self.PlayerY += (entity.h + 5);
                                } else {
                                    self.PlayerY -= (48 + 10);
                                }

                                // if (entity.x < 350)
                                //  self.PlayerX += entity.w + 5
                                // else 
                                //  self.PlayerX -= (48 + 5);                               

                                self.playerWarpFound = true;                        
                            }

                            // has attribute - 'tiledprops'
                        } else if (entity.rName == 'warp' && !self.playerWarpFound) {
                            self.PlayerX = entity.x;
                            self.PlayerY = entity.y;
                            // has attribute - 'tiledprops'
                        } else if (entity.rName == 'potion') {
                            entity = entity.addComponent("Collision, Potion").collision();
                        }
                    }

                    // notify
                    callback({x: self.PlayerX, y: self.PlayerY, map: map});
                });

            $('#loading').hide();

        });     
    };

    return {
        create: function(id) {
            return new Room(id);
        }
    };
});
define([], function() {
    
    var config = {

        server : {
            baseUrl : location.protocol + '//' + location.hostname
                    + (location.port ? ':' + location.port : '') + '/',
            nocache: Date()
        },
        build : {
            env : 'dev',
            scene : ''
        },

        forceDebug : true,
        // debug: (build.env === 'dev') || forceDebug,

        screen : {
            width: 1024,
            height: 768,
            fps: 60,
            render: 'DOM'
        },

        gameplay: {
            rooms: {
                room1: {
                    name: 'Room #1',
                    file: 'data/room1.json'
                },
                room2: {
                    name: 'Room #2',
                    file: 'data/room2.json'
                }
            }
        }

    };
    
    return config;
});
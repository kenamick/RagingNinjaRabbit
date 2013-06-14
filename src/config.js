define([], function() {
    
    var config = {

        server : {
            baseUrl : location.protocol + '//' + location.hostname
                    + (location.port ? ':' + location.port : '') + '/',
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
            fps: 60
        }

    };
    
    return config;
});
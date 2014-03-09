requirejs.config({
    paths: {
        'angular': '../bower_components/angular/angular',
        'd3': '../bower_components/d3/d3',
        'jquery': '../bower_components/jquery/dist/jquery',
        'lodash': '../bower_components/lodash/dist/lodash',
        'text': '../bower_components/requirejs-text/text'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        }
    }
});

require([
    'jquery',
    'angular',
    './app'
], function ($, angular) {
    'use strict';

    angular.bootstrap($('body').get(0), ['tinstreet']);
});

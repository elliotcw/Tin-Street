define(function (require) {
    'use strict';

    var angular = require('angular');
    require('./controllers');
    require('./directives');
    require('./services');

    angular.module('market', ['market.controllers', 'market.directives', 'market.services']);
});
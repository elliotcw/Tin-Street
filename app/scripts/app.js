define(function (require) {
    'use strict';

    var angular = require('angular');
    require('desktop/desktop');
    require('orders/orders');
    require('market/market');
    require('portfolio/portfolio');
    require('account/account');

    angular.module('tinstreet', [
        'desktop', 'orders', 'market', 'portfolio', 'account'
    ]);
});
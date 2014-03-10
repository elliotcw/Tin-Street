define(function (require) {
    'use strict';

    var angular = require('angular');
    var depthTemplate = require('text!./templates/depth.html');
    var marketTemplate = require('text!./templates/market.html');

    angular.module('market.directives', ['market.services'])
        .directive('market', function (depthService, $timeout) {
            return {
                restrict: 'E',
                template: marketTemplate,
                controller: function ($scope, $element) {

                    $scope.bids = [];
                    $scope.asks = [];

                    $scope.groupedBids = [];
                    $scope.groupedAsks = [];

                    $scope.close = function () {
                        if ($scope.pollTimeout) {
                            $timeout.cancel($scope.pollTimeout);
                        }
                        $element.remove();
                    };

                    $scope.$watch('instrumentCode', function (newValue) {
                        if (newValue) {
                            $scope.loading = true;
                            $scope.fetchData().then(function () {
                                $scope.loading = false;
                            });
                        }
                    });

                    $scope.fetchData = function () {
                        return depthService($scope.instrumentCode).then(function (data) {
                            //  success callback
                            $scope.bids = data.bids || [];
                            $scope.asks = data.asks || [];

                            $scope.groupedBids = data.groupedBids || [];
                            $scope.groupedAsks = data.groupedAsks || [];

                            if ($scope.pollTimeout) {
                                $timeout.cancel($scope.pollTimeout);
                            }

                            $scope.pollTimeout = $timeout(function () {
                                $scope.fetchData();
                            }, 1000);
                        }, function () {
                            // error callback
                            console.log(arguments);
                        });
                    };
                }
            };
        })
        .directive('depth', function () {
            return {
                restrict: 'E',
                template: depthTemplate,
                scope: {
                    'orders': '=',
                    'side': '@'
                },
                controller: function ($scope, $filter) {
                    var expression = ($scope.side === 'bid') ? ['-price', '-enteredTimestamp'] : ['price', '-enteredTimestamp'];
                    $scope.orders = $filter('orderBy')($scope.orders, expression);
                }
            };
        });
});
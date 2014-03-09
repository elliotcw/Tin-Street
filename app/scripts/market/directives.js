define(function (require) {
    'use strict';

    var _ = require('lodash');
    var angular = require('angular');
    var depthTemplate = require('text!./depth-template.html');

    angular.module('market.directives', ['market.services'])
        .directive('depth', function (depthService, $timeout) {
            return {
                restrict: 'E',
                template: depthTemplate,
                controller: function ($scope, $element) {
                    $scope.close = function () {
                        $element.remove();
                    };

                    $scope.loading = false;

                    $scope.$watch('instrumentCode', function () {
                        $scope.loading = true;
                        $scope.fetchData().then(function () {
                            $scope.loading = false;
                        });
                    });

                    $scope.fetchData = function () {
                        return depthService($scope.instrumentCode).then(function (response) {                            
                            $scope.bids = response.data.bids;
                            $scope.asks = response.data.asks;

                            $scope.groupedBids = _.groupBy($scope.bids, function (bid) {
                                return Math.round(bid.price * 100) / 100;
                            });

                            $scope.groupedBids = _.map($scope.groupedBids, function (group) {
                                var unfilled = _.reduce(group, function (sum, bid) {
                                    sum = sum.unfilled + bid.unfilled;
                                    return {unfilled: sum};
                                }).unfilled;
                                var isMyOrder = _.filter(group, function (bid) {
                                    return bid.isMyOrder;
                                }).length;
                                return {price: group[0].price, unfilled: unfilled, isMyOrder: isMyOrder};
                            });

                            $scope.groupedAsks = _.groupBy($scope.asks, function (ask) {
                                return Math.round(ask.price * 100) / 100;
                            });

                            $scope.groupedAsks = _.map($scope.groupedAsks, function (group) {
                                var unfilled = _.reduce(group, function (sum, ask) {
                                    sum = sum.unfilled + ask.unfilled;
                                    return {unfilled: sum};
                                }).unfilled;
                                var isMyOrder = _.filter(group, function (ask) {
                                    return ask.isMyOrder;
                                }).length;
                                return {price: group[0].price, unfilled: unfilled, isMyOrder: isMyOrder};
                            });

                            if ($scope.poll) {
                                $timeout.cancel($scope.poll);
                            }

                            $scope.poll = $timeout(function () {
                                $scope.fetchData();
                            }, 1000);
                        }, function () {
                            console.log(arguments);
                            $scope.asks = [];
                            $scope.bids = [];
                            $scope.groupedAsks = [];
                            $scope.groupedBids = [];
                        });
                    };                    
                }
            };
        });
});
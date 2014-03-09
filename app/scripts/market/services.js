define(function (require) {
    'use strict';

    var angular = require('angular');

    angular.module('market.services', [])
        .factory('depthService', function ($q, $http) {
            return function (instrumentCode) {

                return $http.get('api/depth?instr=' + instrumentCode);

                var dfd = $q.defer();

                var data = {'bids': [{'orderId': null, 'unfilled': 1, 'price': '2.0', 'isMyOrder': true, 'enteredTimestamp': '2014-02-08T19:34:32.314965Z'}, {'orderId': null, 'unfilled': 1, 'price': '1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T10:20:54.915310Z'}, {'orderId': null, 'unfilled': 1, 'price': '1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T10:33:47.989586Z'}, {'orderId': null, 'unfilled': 1, 'price': '1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T10:50:03.481623Z'}, {'orderId': null, 'unfilled': 1, 'price': '1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T11:34:50.939253Z'}, {'orderId': null, 'unfilled': 1, 'price': '1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T13:29:20.416197Z'}, {'orderId': null, 'unfilled': 1, 'price': '1.1', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T14:35:36.837177Z'}, {'orderId': null, 'unfilled': 1, 'price': '1.12', 'isMyOrder': false, 'enteredTimestamp': '2014-02-26T17:36:34.752252Z'}, {'orderId': null, 'unfilled': 4, 'price': '5', 'isMyOrder': false, 'enteredTimestamp': '2014-03-02T00:24:26.706286Z'}, {'orderId': '2', 'unfilled': 4, 'price': '6', 'isMyOrder': false, 'enteredTimestamp': '2014-03-05T17:07:20.444286Z'}, {'orderId': 'E', 'unfilled': 1, 'price': '8', 'isMyOrder': false, 'enteredTimestamp': '2014-03-05T17:15:35.492964Z'}, {'orderId': 'F', 'unfilled': 1, 'price': '8', 'isMyOrder': false, 'enteredTimestamp': '2014-03-05T17:15:41.246344Z'}, {'orderId': '10', 'unfilled': 1, 'price': '8', 'isMyOrder': false, 'enteredTimestamp': '2014-03-05T17:15:50.849410Z'}, {'orderId': '11', 'unfilled': 1, 'price': '8', 'isMyOrder': false, 'enteredTimestamp': '2014-03-05T17:16:11.149503Z'}], 'asks': [{'orderId': null, 'unfilled': 7, 'price': '11', 'isMyOrder': false, 'enteredTimestamp': '2014-01-26T14:20:51.907970Z'}, {'orderId': null, 'unfilled': 15, 'price': '12.0', 'isMyOrder': true, 'enteredTimestamp': '2014-01-26T14:21:33.626894Z'}]};
                dfd.resolve(data);

                return dfd.promise;
            };
        });
});
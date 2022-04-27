(function () {
    'use strict';

    angular.module('MatchResults', [])
        .controller('MatchResultsController', MatchResultsController)
        .constant('ServerAddress',"http://localhost:8080/")
        .controller('MatchUpdate' ,['$scope',"$http",'ServerAddress',function ($scope, $http,ServerAddress) {
            $scope.getUpdate = function () {
                let date = new Date().toLocaleDateString();
                let parsedDate=date.substring(6,10)+'-'+date.substring(3,5)+'-'+date.substring(0,2);
                console.log(parsedDate);
                $http({
                    method: "GET",
                    url: (ServerAddress+"matches/"+parsedDate)
                });
            }
        }])
        .service('MatchService', MatchService);


    MatchResultsController.$injected = ['MatchService'];

    function MatchResultsController(MatchService) {
        let match = this;
        let promise = MatchService.getMatchService();



        promise.then(function (response) {
            match.results = response.data;
        })
            .catch(function (error) {
                console.log('Some error');
            })
    }

    MatchService.$inject = ['$http']

    function MatchService($http) {
        let service = this;

        service.getMatchService = function () {
            let response = $http({
                method: "GET",
                url: ("http://localhost:8080/matches")
            });
            return response;
        }
    }


})();

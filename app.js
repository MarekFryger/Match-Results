(function () {
    'use strict';

    angular.module('MatchResults', [])
        .controller('MatchResultsController', MatchResultsController)
        .controller('LeagueController', LeagueController)
        .constant('ServerAddress', "http://localhost:8080/")
        .controller('MatchUpdate', ['$scope', "$http", 'ServerAddress', function ($scope, $http, ServerAddress) {
            $scope.getUpdate = function () {
                let date = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'});
                let parsedDate = date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2);
                console.log(parsedDate);
                $http({
                    method: "GET",
                    url: (ServerAddress + "matches/" + parsedDate)
                });
            }
        }])
        .controller('LeagueList', ['$scope', function ($scope) {
            let leagues = [
                {
                    leagueName: 'Poland Ekstraklasa',
                    leagueId: 'PL1'
                }, {
                    leagueName: 'England Premier League',
                    leagueId: 'GB1'
                }, {
                    leagueName: 'Spanish La Liga',
                    leagueId: 'ES1'
                }, {
                    leagueName: 'German Bundesliga',
                    leagueId: 'L1'
                }, {
                    leagueName: 'Italy Serie A',
                    leagueId: 'IT1'
                }, {
                    leagueName: 'France Ligue 1',
                    leagueId: 'FR1'
                }, {
                    leagueName: 'Holland Eredivisie',
                    leagueId: 'NL1'
                },
            ];
            $scope.getLeagueList = function () {
                return leagues;
            }
        }])
        .service('LeagueService', LeagueService)
        .service('MatchService', MatchService);




    MatchResultsController.$injected = ['MatchService'];
    LeagueController.$injected = ['LeagueService'];

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



    function LeagueController(LeagueService) {
        let league = this;
        let promise = LeagueService.getLeagueService();

        promise.then(function (responseLeague){
            league.results = responseLeague.data;
        })
            .catch(function (error) {
                console.log('Some error');
            })
    }

    LeagueService.$inject = ['$http', 'ServerAddress'];

    function LeagueService($http, ServerAddress) {
        let leagueService = this;
        leagueService.getLeagueService = function () {
            let responseLeague = $http({
                method: "GET",
                url: (ServerAddress+'league/PL1')
            });
            return responseLeague;
        }
    }
})();

(function () {
  'use strict';
  angular.module('myfirstApp',[])
  .controller('MyfirstController', function($scope) {
$scope.name = "Marek";
$scope.sayHello = function () {
  return "Hello Coursera!";
};
  });
})();

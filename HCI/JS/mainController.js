var app = angular.module('myApp');
app.controller('mainController', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
  $scope.count=0;
  $scope.small_temps=['HTML/small_temps/map.html','HTML/small_temps/exceptions.html','HTML/small_temps/late_packages.html',
  'HTML/small_temps/couriers.html','HTML/small_temps/progress.html'];
  $scope.main_temps=['HTML/main_temps/progress_main.html','HTML/main_temps/map_main.html','HTML/main_temps/exceptions_main.html',
  'HTML/main_temps/late_packages_main.html','HTML/main_temps/couriers_main.html'];

  $scope.nextSlide=function(timeOut){
    $timeout(function(){
      $http.get("data/courier_info.json").then(function (response) {
        $scope.data = response.data;
      });
      $scope.main=$scope.main_temps[$scope.count]
      $scope.one=$scope.small_temps[$scope.count]
      $scope.two=$scope.small_temps[($scope.count+1)%$scope.small_temps.length]
      $scope.three=$scope.small_temps[($scope.count+2)%$scope.small_temps.length]
      $scope.four=$scope.small_temps[($scope.count+3)%$scope.small_temps.length]
      $scope.count+=1
      if($scope.count>=$scope.small_temps.length)
        $scope.count=0

      $scope.nextSlide(20000)
      $scope.updateItems(180)
      $scope.updateMap(180)
    },timeOut);
  };
  $scope.nextSlide(0)

  $scope.updateItems=function(timeOut){
    $timeout(function(){
      initGraphs($scope.data)
    },timeOut);
  };

  $scope.updateMap=function(timeOut){
    $timeout(function(){
      initMap()
    },timeOut);
  };

}]);

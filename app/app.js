var myNinjaApp = angular.module('myNinjaModule',['ngRoute', 'ngAnimate']); //we use [] to put dependencies
//Runs before application starts
myNinjaApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider){

	$locationProvider.html5Mode(true);
	
	$routeProvider
	.when('/home',
	{
		templateUrl:'views/home.html',
		controller:'NinjaController'
	})
	.when('/contact',
	{
		templateUrl:'views/contact.html',
		controller:'ContactController'
	})
	.when('/contact-success',
	{
		templateUrl:'views/contact-success.html',
		controller:'ContactController'
	})
	.when('/directory',
	{
		templateUrl:'views/directory.html',
		controller:'NinjaController'
	})
	.otherwise({
		redirectTo:'/home'
	})

}]);
//Custom Directive
myNinjaApp.directive('randomNinja',[function(){
	return { //return is mandatory in a directive.
		restrict: 'E', //it can only be used as element in HTML, if A then only as a attribute
		scope: {
			ninja: '=',
			title: '='
		},
		templateUrl: 'views/random.html',
		transclude: true, //it includes the content of the custom directive. See home.html for more explanation
		replace: true, //it replaces the random-ninja tag by other tag. Just to look nice
		controller: function($scope){
			$scope.random = Math.floor(Math.random() * 4);
		}
	};
}]);

myNinjaApp.controller('NinjaController',['$scope', '$http',function($scope, $http){
	$scope.removeNinja = function(ninja){
		var removedNinja = $scope.ninjas.indexOf(ninja);
		$scope.ninjas.splice(removedNinja,1);
	}
	$scope.addNinja = function(){
		$scope.ninjas.push({
			name:$scope.newninja.name,
			belt:$scope.newninja.belt,
			rate:parseInt($scope.newninja.rate),
			available:true
		});
		$scope.newninja.name = "";
		$scope.newninja.belt = "";
		$scope.newninja.rate = "";
	}
	$scope.removeAll = function(){
		$scope.ninjas = [];
	}

	$http.get('data/ninjas.json').then(function (response) {
       $scope.ninjas = response.data;
    });﻿

}]);

myNinjaApp.controller('ContactController',['$scope','$location', function($scope,$location){
	$scope.sendMessage = function(){
		$location.path('/contact-success');
	}
}]);
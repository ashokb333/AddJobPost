var sampleApp = angular.module('sampleApp', ['ui.bootstrap']).filter('startFrom', function () {
  return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    } 
	 
});
sampleApp.controller('sampleController', function ($scope, $http, $window) {
			 
	//-----------Check User Credentials --------------------------
	    $scope.submitLogin = function() {
			console.log($scope.userauth);
				$http({
					 method  : 'POST',
					 url     : 'http://localhost:8080/api/userlog/',
					 data    : $scope.userauth 
				}).then(function(response){
						console.log(response);
						if(response.data.length==0){
							alert('user not found');
						}else {	
						
						$window.localStorage["userid"] = JSON.stringify(response.data[0].userid);
						$window.localStorage["username"] = response.data[0].username; 					
						window.location.href='main.html';
					}
				}); 
		};  
		
		
		
		 
		 
  });
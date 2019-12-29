var JobApp = angular.module('JobApp', ['ui.bootstrap']).filter('startFrom', function () {
  return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    } 
	 
});
JobApp.controller('jobostController', function ($scope, $http, $window) {
			 $scope.userid=$window.localStorage["userid"]; 
		//----------- Add New Job Post --------------------------
			$scope.postjob1=function(){		
				$scope.postJob.userid = $window.localStorage["userid"]; 
					$http({
						method:'POST',
						url:'http://localhost:8080/api/postjob1/',
						data:$scope.postJob
					}).success(function(data) {
						$scope.status = data.status;
						 
							if ($scope.status==0) {
								alert("Added Succesfully");
								$window.location.reload();
							} else {
								alert('Something Wrong!');									 
							}
					});			
				 
			};
			//----------- Update my Job Post --------------------------
			$scope.postjobupdate=function(){ 
					$http({
						method:'POST',
						url:'http://localhost:8080/api/postjobupdate/',
						data:$scope.Getjobpostdata
					}).success(function(data) {
						$scope.status = data.status;
						 
							if ($scope.status==0) {
								alert("Updated Succesfully");
								$window.location.reload();
							} else {
								alert('Something Wrong!');									 
							}
					});			
				 
			};
			
		//-----------get List Of All Job Posts --------
			$scope.getmyjobposts = function () {
				$http({
					method: 'GET',
					url: 'http://localhost:8080/api/getmyjobposts/'+$scope.userid,
					dataType: 'jsonp'
				}).then(function (response) {
					$scope.getmyjobpostsdata = response.data;
				});
			};
		 
		 
		//-----------get Job Post detail --------
			$scope.Getjobpost = function (id) {
				$http({
					method: 'GET',
					url: 'http://localhost:8080/api/Getjobpost/'+id,
					dataType: 'jsonp'
				}).then(function (response) {
					$scope.Getjobpostdata = response.data;
				});
			};
		 
		//----------- Delete JobPost ------------------
			$scope.DeleteJob = function(id) { 
				if (confirm("Are you sure to Delete?")==true){				  
				$http({
					method: 'DELETE',
					url: 'http://localhost:8080/api/DeleteJob/'+id,
					dataType: 'jsonp'
				}).success(function(data) {
					    $scope.status = data.status;
							if ($scope.status===0) {
							alert('JobPost Deleted Succesfully..!');
							$window.location.reload();	
				            } else {
								 alert("Failed to Delete");								 	 
							}
				});				  
			}else{
				return false;
			};
		};
		 
  });
angular.module("dtApp",[]).controller("userCtrl",["$scope", "$http", function($scope, $http){

	$scope.users = [];
	
	$scope.search = '';			//for searching
	
	$scope.sortType = 'name';		//setting the default sortType
	$scope.sortReverse = false;		//setting the default sortReverse	
	
	$http.get('https://jsonplaceholder.typicode.com/users').success(function (data) {
       console.log("i m called");
	   console.log(data);
	   $scope.users = data;
    });
	
	// pagination
	$scope.curPage = 1;
	$scope.pageSize = 2;
	
	$scope.numberOfPages = function() 
	{
		return Math.ceil($scope.users.length / $scope.pageSize);
	};
	
	//for editing table data
	$scope.editingData = {};
    
    for (var i = 0, length = $scope.users.length; i < length; i++) {
      $scope.editingData[$scope.users[i].id] = false;
    }

    $scope.modify = function(tableData){
        $scope.editingData[tableData.id] = true;
    };

    $scope.update = function(tableData){
        $scope.editingData[tableData.id] = false;
    };
	
	//for adding row
	$scope.addRow = function()
	{
		var new_id = $scope.users.length + 1;	
		var new_row = {
						"id": new_id,
						"name": "Test",
						"username": "test",
						"email": "test@april.biz",
						"address": {
						  "street": "opposite bg5",
						  "suite": "bg6",
						  "city": "paschim vihar",
						  "zipcode": "110063",
						  "geo": {
							"lat": "-37.3159",
							"lng": "81.1496"
						  }
						},
						"phone": "7838345061",
						"website": "abc@gmail.com",
						"company": {
						  "name": "honeywell",
						  "catchPhrase": "Copyright by Honeywell",
						  "bs": "software engineer"
						}
					  };
					  
		
		$scope.users.push(new_row);
	}
}]).filter('pagination', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    };
});
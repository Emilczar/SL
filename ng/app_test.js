const myApp = angular.module('myApp', []);




myApp.controller('ConList_test', ['$scope', '$http', ($scope, $http) => {

  $scope.getList = ()=> {
    $http.get('/api/lists')
      .then((res) => {
        // $scope.dane = JSON.stringify(res.data)
        $scope.dane = res.data
        console.log("Lists: " + JSON.stringify(res.data))
      })
  }

  $scope.getListId = function(id){
    $http.get('/api/lists/'+id)
    .then((res)=>{
      $scope.daneID = res.data.list
      console.log("ID: " + JSON.stringify(res.data))
      console.log("ID res.data: " +res.data.list )
    })
  }
 

}])
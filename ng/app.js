const app = angular.module('myApp', ['ngRoute', 'dbService']);

app.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

    $routeProvider
        .when('/lists', {
            controller: 'ContrList',
            templateUrl: '/views/lists.html'
        })
        .when('/lists/:id', {
            controller: 'ContrIdList',
            templateUrl: '/views/list_id.html'
        })
        .when('/lists/zm/:id', {
            controller: 'ContrIdEdit',
            templateUrl: '/views/edycja_id.html'

        })
        .when('/new', {
            controller: 'ContrNew',
            templateUrl: '/views/new.html'

        })
        .when('/inne', {
            templateUrl: '/views/inne.html',
        })

        .otherwise({
            redirectTo: '/inne'
        })

    $locationProvider
        .html5Mode(true);

}])




// controler do pobrania calej listy TODO
app.controller('ContrList', ['$scope', 'dbList', function ($scope, dbList) {

    $scope.lists = {};
    dbList.getList((res) => {
        $scope.lists = res.data;

    })
    console.log("wynik     " + $scope.lists);
}])
//testy

// controler do pobrania dokladej listy zadan po ID 
app.controller('ContrIdList', ['$scope', 'dbList', '$routeParams', '$window', function ($scope, dbList, $routeParams, $window) {
    $scope.list = {};
    dbList.getIdList($routeParams.id, (res) => {
        $scope.list = res.data.list;
        $scope.id = res.data._id;
        $scope.name = res.data.name;
        console.log(`ContrIdList ${res.data.list}`)
    })


    ///////////////////////////////////////////////////////////////////
    // Funcja do dodawania do listy przez dyrektywe wersja TESTOWA
    let data = {
        name: "zmian4",
        status: 1,

    }
    console.log("test 1")
    $scope.addList = () => {
        dbList.addList($routeParams.id, data);
        $window.location.reload();

    }

}])

////////////////////////////////////////////////////////////////////////////
//Controler od tworzenia nowej listy NEW

app.controller('ContrNew', ['$scope', '$window', 'dbList', function ($scope, $window, dbList) {
    $scope.ListaNew = [];



    $scope.addToList = () => {
        let stan = $window.document.getElementById('Zadanie').value

        //sprawdzenie czy jest cos wpisane w input do tablicy zadan
        if (stan == 0) {


            
            $window.alert("brak danych"); 

            /*
          
          
          trzeba dodac funckje która wyswietli ze nic nie dodalismy

        */


        }

        // dodawanie wartosci do tablicy zadań
        else {
            let arg = {
                status: 0,
                name: $window.document.getElementById('Zadanie').value
            }

            $scope.ListaNew.push(arg) // dodawanie do tablicy zadan
            $window.document.getElementById('Zadanie').value = ""; // czysczenie inputa  do listy
        }

       

    }


    $scope.createList = () => {
        let arr = $scope.ListaNew

        let data = {
            name: $window.document.getElementById('SendList').value,
            stan: 1,
            list: arr
        }
        $window.console.log("name : " + data.name)
        dbList.createList(data);
        $window.console.log("lista")
        /// czyszczenie zawartosi formularza new
        $window.document.getElementById('SendList').value = "";
        delete $scope.ListaNew;





    }
}])

// controler do dodawania do listy kolejnych zadan
app.controller('ContrIdEdit', ['$scope', 'dbList', '$routeParams', function ($scope, dbList, $routeParams) {

    var data = {
        name: "zmian1",
        status: 0
    }
    dbList.addList($routeParams.id, data)

}])
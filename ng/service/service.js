(function () {
    const app = angular.module('dbService', [])

    // service do pobierania całej listy TODO
    app.factory('dbList', ['$http', ($http) => {

        const _getList = (cb) => {
            cb = cb || function () {};
            $http.get('/api/lists')
                .then((data) => {
                    cb(data);
                })
        }
        // funkcja do pobierania danych z wybranej listy 
        const _getIdList = (id,cb)=>{
            cb = cb|| function(){};
            
            $http.get('api/lists/'+id)
            .then((res) => {
                console.log(`cb dbIdList :  ${JSON.stringify(res.data.list)}`)
                cb(res)
            })
            .catch((err)=>{
                console.log(`error dbIdList :  ${err}`)
            })
        }
        // funkcja do dodawania wybranej listy TODO kolejnego zadania
        const _addList = (id, data)=>{  
            $http.put('api/lists/'+id , data)
            .then((data)=>{
                console.log(`editList :  ${data}`)
            })
            .catch((err)=>{
                console.log(`error dbIdList :  ${err}`)
            })
        }
        // funkcja do create new list

        const _createList = (data)=>{
            $http.post('api/new' ,data)
            .then((data)=>{
                console.log(`newList :  ${data}`)
            })
            .catch((err)=>{
                console.log(`error newList :  ${err}`)
            })
        }

        return {
            getList: _getList,
            getIdList: _getIdList,
            addList: _addList,
            createList: _createList
        };
    }])


 

  


})();
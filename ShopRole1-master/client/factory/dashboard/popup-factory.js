
dashboardapp.factory("popupfactory",function($q,$http,UPDATEPRODUCT_URL){
    return{
        updateProduct(newObject){
            console.log("Inside login in factory",newObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(UPDATEPRODUCT_URL,newObject).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        }

    }
})
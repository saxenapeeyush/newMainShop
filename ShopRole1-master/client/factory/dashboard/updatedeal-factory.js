dashboardapp.factory("updatedealfactory",function($http,$q,UPDATEEXISTINGDEAL_URL){
    return{
        updateExistingDeal (updateObject){
            console.log("Inside login in factory",updateObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(UPDATEEXISTINGDEAL_URL,updateObject).then(data=>{
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
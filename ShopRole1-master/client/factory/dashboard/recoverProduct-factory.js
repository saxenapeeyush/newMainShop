dashboardapp.factory("recoverProductfactory",function($q,$http,REMOVEPERMANENT_URL,RECOVER_URL){
    return{
        
        removePermanentProduct(productCategory){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(REMOVEPERMANENT_URL,productCategory).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        recoverDeletedProduct(productCategory){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(RECOVER_URL,productCategory).then(data=>{
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
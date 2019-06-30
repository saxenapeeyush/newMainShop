dashboardapp.factory("dealfactory",function($http,$q,DEAL_URL){
    return{
        deal(object){
            console.log("Inside login in factory",object);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(DEAL_URL,object).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        }
    }

});
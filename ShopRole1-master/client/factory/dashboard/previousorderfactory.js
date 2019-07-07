dashboardapp.factory("previousorderfactory",function($q,$http,GETPREVIOUSORDER_URL){
    return{
        
        getPreviousOrders(emailObject){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(GETPREVIOUSORDER_URL,emailObject).then(data=>{
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
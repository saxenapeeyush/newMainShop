dashboardapp.factory("currentorderfactory",function($q,$http,GETCURRENTORDER_URL){
    return{
        
        getCurrentOrders(emailObject){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(GETCURRENTORDER_URL,emailObject).then(data=>{
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
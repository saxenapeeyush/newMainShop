dashboardapp.factory("changestatustemplatefactory",function($q,$http,CHANGESTATUS_URL){
    return{
        
        changeStatus(statusObject){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(CHANGESTATUS_URL,statusObject).then(data=>{
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
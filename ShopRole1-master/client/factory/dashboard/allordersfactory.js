dashboardapp.factory("allordersfactory",function($q,$http,ALLORDERS_URL,GETVERIFIEDBOYS_URL){
    return{
        allorders(){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(ALLORDERS_URL).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        getallverifiedboys(){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(GETVERIFIEDBOYS_URL).then(data=>{
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
dashboardapp.factory("alldeliveryboysfactory",function($q,$http,GETVERIFIEDBOYS_URL,GETUNVERIFIEDBOYS_URL,VERIFYDELIVERYBOYS_URL,UNVERIFYDELIVERYBOYS_URL){
    return{
        
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
        },
        getallunverifiedboys(){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(GETUNVERIFIEDBOYS_URL).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        verifyDeliveryBoys(deliveryBoyId){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(VERIFYDELIVERYBOYS_URL,deliveryBoyId).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        unverifyDeliveryBoys(deliveryBoyId){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(UNVERIFYDELIVERYBOYS_URL,deliveryBoyId).then(data=>{
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
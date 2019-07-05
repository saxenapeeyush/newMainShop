customerapp.factory("customerorderfactory",($http,$q,GETALLORDERS_URL)=>{
    return{
        getallorders(emailObject){
            console.log("Inside login in factory",emailObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(GETALLORDERS_URL,emailObject).then(data=>{
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
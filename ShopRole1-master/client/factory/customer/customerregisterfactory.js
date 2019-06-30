customerapp.factory("customerregisterfactory",function($http,$q,REGISTER_URL){
    return{
        register(userObject){
            console.log("Inside register in factory");
            let defer=$q.defer();
            console.log("Calling register url");
            $http.post(REGISTER_URL,userObject).then(data=>{
                console.log("REceiving data after ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
    
            return defer.promise;
        }
    }
})
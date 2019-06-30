customerapp.factory("customernavbarfactory",function($http,$q,LOGIN_URL){
    return{
        login(userObject){
            console.log("Inside login in factory",userObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(LOGIN_URL,userObject).then(data=>{
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
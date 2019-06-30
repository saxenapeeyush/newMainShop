app.factory("adminfactory",($http,$q,LOGIN_URL,LOGINFIRST_URL,CHANGEPASSWORD_URL)=>{
    return{
        login(adminObject){
            console.log("Inside login in factory",adminObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(LOGIN_URL,adminObject).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        
        loginFirst(adminObject){
            console.log("Inside login in factory",adminObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(LOGINFIRST_URL,adminObject).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        changePassword(PasswordObject){
            console.log("Inside changepassword in factory");
            let defer=$q.defer();
            console.log("calling changepassword url");
            $http.post(CHANGEPASSWORD_URL,PasswordObject).then(data=>{
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
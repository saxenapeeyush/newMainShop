app.factory("mainfactory",($http,$q,FINDADMIN_URL)=>{
    return{
        isAdminPresent(){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(FINDADMIN_URL).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        }
    }})
dashboardapp.factory("addRoletemplatefactory",function($q,$http,ADDNEWROLES_URL){
    return{
        
        getNewRole(newRoleObject){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(ADDNEWROLES_URL,newRoleObject).then(data=>{
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
dashboardapp.factory("dashboardfactory",function($q,$http,GETDATA_URL){
    return{
        
        getData(){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(GETDATA_URL).then(data=>{
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
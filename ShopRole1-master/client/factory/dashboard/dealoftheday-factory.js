dashboardapp.factory("dealofthedayfactory",function($http,$q,DODINDEX_URL,DODDELETE_URL
    ){
    return{
        index(i){
            console.log("Inside login in factory",i);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(DODINDEX_URL,i).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
        },
        removeDealPermanent(i){
            console.log("Inside login in factory",i);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(DODDELETE_URL,i).then(data=>{
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
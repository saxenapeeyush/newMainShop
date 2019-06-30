customerapp.factory("customerproductfactory",function($http,$q,CUSTOMERPRODUCTS_URL){
    return{
       
       getallproducts(){
            console.log("Inside login in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.get(CUSTOMERPRODUCTS_URL).then(data=>{
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
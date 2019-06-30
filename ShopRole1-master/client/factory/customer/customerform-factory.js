customerapp.factory("customerformfactory",($http,$q,CUSTOMERFORM_URL)=>{
    return{
        customerform(customerformObject){
            console.log("Inside login in factory",customerformObject);
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(CUSTOMERFORM_URL,customerformObject).then(data=>{
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
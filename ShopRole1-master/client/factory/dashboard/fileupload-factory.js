dashboardapp.factory("fileUploadfactory",function($q,$http,REMOVE_URL){
    return{
        
        removeProduct(productCategory){
            console.log("Inside   find admin in factory");
            let defer=$q.defer();
            console.log("calling login url");
            $http.post(REMOVE_URL,productCategory).then(data=>{
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
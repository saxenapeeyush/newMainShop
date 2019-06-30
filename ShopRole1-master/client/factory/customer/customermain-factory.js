customerapp.factory("customermainfactory",function($http,$q,GETCUSTOMERCART_URL){
    return{  getcartproducts(email){
        console.log("Email is",email);
        let defer=$q.defer();
        console.log("calling login url");
        console.log("********",email);
        $http.post(GETCUSTOMERCART_URL,email).then(data=>{
            console.log("receiving data from ajax call");
            defer.resolve(data);
        },(error)=>{
            defer.reject(error);
        });
        console.log("Return promise");
        return defer.promise;
    }
        
    }

});
customerapp.factory("customercartfactory",function($http,$q,GETCUSTOMERCART_URL,REMOVEFROMDBCART_URL){
    return{
        getcartproducts(email){
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
        },
        removeFromDb(cartIdObject){
           
            let defer=$q.defer();
            console.log("calling login url");
         
            $http.post(REMOVEFROMDBCART_URL,cartIdObject).then(data=>{
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
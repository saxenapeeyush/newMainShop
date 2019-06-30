customerapp.factory("customersingleproductfactory",($q,$http,ADDCARTTODB_URL)=>{
    return{
        fetchSingleProducts(desc){
            console.log("Inside fetch in single factory",desc);
            let defer=$q.defer();
            console.log("Calling fetch single url");
            $http.get(`http://localhost:1234/customer/product/${desc}`,desc).then(data=>{
                console.log("REceiving data after  single ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return single promise");
    
            return defer.promise;
    },
    addToDbCart(productObject,email){
        console.log("Inside fetch in single factory");
        let defer=$q.defer();
            console.log("calling login url");
            $http.post(ADDCARTTODB_URL,productObject).then(data=>{
                console.log("receiving data from ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return promise");
            return defer.promise;
    }
}})
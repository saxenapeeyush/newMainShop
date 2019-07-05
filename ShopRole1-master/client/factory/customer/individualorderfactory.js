customerapp.factory("individualorderfactory",($q,$http)=>{
    return{
        fetchSingleOrder(desc){
            console.log("Inside fetch in single factory",desc);
            let defer=$q.defer();
            console.log("Calling fetch single url");
            $http.get(`http://localhost:1234/customer/myorders/${desc}`,desc).then(data=>{
                console.log("REceiving data after  single ajax call");
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });
            console.log("Return single promise");
    
            return defer.promise;
    }}
})
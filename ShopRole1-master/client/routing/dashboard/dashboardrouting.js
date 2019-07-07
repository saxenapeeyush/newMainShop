
dashboardapp.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/addUser',{
        templateUrl:'./views/addUser.html'
    }) .when('/deliveryboys',{
        templateUrl:'./views/deliveryboys.html',
        controller:'alldeliveryboys-controller'
      
    }).when('/previousorders',{
        templateUrl:'./views/previousorders.html'
        
      
    }).when('/currentorders',{
        templateUrl:'./views/currentorders.html'
      
    }).when('/pendingorders',{
        templateUrl:'./views/pendingorders.html'
      
    })
    .when('/addRole',{
        templateUrl:'./views/addRole.html',
        controller:'addRole-controller'
      
    }).when('/addRight',{
        templateUrl:'./views/addRight.html'
    }).when('/product/:productid',{
        templateUrl:'./views/singleadminproduct.html'
      
    })
    .when('/paymentMethod',{
        templateUrl:'./views/PaymentMethod.html'
     
    }).when('/addProduct',{
        templateUrl:'./views/addProduct.html'
     
    }).when('/recoverProduct',{
        templateUrl:'./views/recoverProduct.html'
     
    }).when('/',{
        templateUrl:'./views/home.html'
     
    }).when('/dealoftheday',{
        templateUrl:'./views/dealoftheday.html'
     
    })
    .when('/allorders',{
        templateUrl:'./views/allorders.html'
     
    })
   
    .otherwise({
        template:`<h1>U Type Something Wrong </h1>`
    })
})
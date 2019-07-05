
customerapp.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/',{
        templateUrl:'./views/customerproducts.html'
    }) .when('/customer/product/:productDesc',{
        templateUrl:'./views/individualproduct.html'
      
    }).when('/customer/orders',{
        templateUrl:'./views/customerorders.html',
        controller:'customerorders-controller'
      
    }).when('/customer/cart',{
        templateUrl:'./views/customercart.html'
      
    }).when('/customer/customerservice',{
        templateUrl:'./views/customerservice.html'
      
    }).when('/customer/register',{
        templateUrl:'./views/customerregister.html',
        controller:'customer-register'
      
    }).when('/customer/addressform',{
        templateUrl:'./views/customerform.html',
        controller:'customerform-controller'
      
    })
    .when('/customer/paymentgateways',{
        templateUrl:'./views/paymentgateways.html',
        controller:'paymentgateways-controller'
      
    }).when('/customer/myorders/:orderid',{
        templateUrl:'./views/individualorder.html',
        controller:'individualorder-controller'
      
    })
   
   
    .otherwise({
        template:`<h1>U Type Something Wrong </h1>`
    })
})
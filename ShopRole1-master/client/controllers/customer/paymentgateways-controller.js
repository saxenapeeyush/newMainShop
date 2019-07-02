customerapp.controller("paymentgateways-controller",function($scope,$rootScope){
    console.log("you are inside payment gateways controller");
    $scope.userDetails=$rootScope.userAddressForm;
    $scope.userAmount=$rootScope.amountToBePaid
    console.log( $scope.userDetails);
    console.log( $scope.userAmount);

})
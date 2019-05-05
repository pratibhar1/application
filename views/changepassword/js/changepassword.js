angular.module("inventApp").controller("changepasswordCtrl",function($scope,$http,$state,myFactory){
    var hide_welcome = angular.element(document.querySelector('#wel'));;
    hide_welcome.addClass('hidden').removeClass('welcome');
    $http({
        method: "GET",
        url: x+"/roles"
        }).then(function inventSuccess(respons) {
        $scope.userdata = respons.data;
        $scope.users =  $scope.userdata['roles'];
        });
           $scope.Changepassword = function(){
            $scope.user.role_id =  $scope.users[0].role_id;
            $scope.user.employeeId= sessionStorage.getItem('employeeId');
            $scope.user.password= $scope.user.password;
            myFactory.changePassword($scope.user).then(function(data){
                    $scope.aa = data;
                    swal("Your password changed successfully");
                    $scope.user="";
                },function(err){
                    if(err){
                        $scope.errorMessage = err;
                    }
                })
                $state.transitionTo("Home",null,{'reload':true}); 
           } 
})
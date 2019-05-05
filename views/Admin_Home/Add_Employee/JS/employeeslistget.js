angular.module("inventApp").controller("addemployeeCtrl", function ($scope,$http, $stateParams,$state,myFactory){
    var hdtext = angular.element(document.querySelector('#wel'));
    hdtext.addClass('hidden');
    $scope.$on('$viewContentLoaded',function(){
        $scope.getEmployeeList();
        });
        $scope.maxSize = 5;      // Limit number for pagination display number.  
        $scope.total_employees = 0;   // Total number of items in all pages. initialize as a zero  
        $scope.page = 1;    // Current page number. First page is 1.-->  
        $scope.per_page = 10;  // Maximum number of items per page.  
             
        $scope.getEmployeeList = function () { 
            $http.get(x+"/adduser?page=" + $scope.page + "&count=" + $scope.per_page).then( 
            function (respons) { 
                $scope.employees_data = respons.data.response;
                $scope.headers = Object.keys($scope.employees_data[0]);
                $scope.total_employees = respons.data.total_employees; 
        }, 
        function (err) { 
            var error = err; 
            }); 
        } 
//Loading employees list on first time 
        $scope.getEmployeeList(); 
                //This method is calling from pagination number 
                $scope.pageChanged = function () { 
                $scope.getEmployeeList(); 
                }; 
//This method is calling from dropDown 
        $scope.changePageSize = function () { 
        $scope.page = 1; 
        $scope.getEmployeeList(); 
        };
//updating employee List


$scope.edit=function(){
    // $scope.user.role_id =  $scope.users[0].role_id;
    // $scope.user.employeeId= sessionStorage.getItem('employeeId');
    // $scope.user.password= $scope.user.password;
    
    debugger;
    myFactory.updatenewemployee($stateParams.roleId).then(function(data){
        $scope.employees_data=data.result;
        $state.go("/Addemployee");
    })
}

//relieving a employee.......
        $scope.Relieve = function(employeeId){
            swal({
                title: "Are you sure?",
                text: "Once you deleted, you will not be able to recover this file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                    myFactory.employeedelete(employeeId).then(function(data){
                     if (data != null) {
                           if(data.status == "Failure"){
                                if(data.books != null || data.inventories != null){
                                    swal(data.response,"Make sure he/she returned all books and inventories");
                                }
                           } 
                        } 
                    })
                }
                else{
                    swal("Your file is safe!");
                }
            $state.transitionTo("Admin_home.employeeslist",null,{'reload':true});  
            })
        }
    });


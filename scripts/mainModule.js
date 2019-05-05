var app = angular.module('inventApp',['ui.router','oc.lazyLoad','ui.bootstrap','ngAnimate','base64']);

    var change_back = angular.element(document.querySelector('body'));
    var hide_welcome = angular.element(document.querySelector('#wel'));
    var x = "http://127.0.0.1:5000";
app.config(function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider){
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
            'responseError': function (rejection) {
                var status = rejection.status;
                var config = rejection.config;
                var method = config.method;
                var url = config.url;

                if (status == 401) {
                    $location.path("/Admin_login");
                } else {
                    $rootScope.error = method + " on " + url + " failed with status " + status;
                }

                return $q.reject(rejection);
            }
        };
    })
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
            'request': function (config) {
                var isRestCall = config.url.indexOf('rest') == 0;
                if (isRestCall && angular.isDefined($rootScope.accessToken)) {
                    var accessToken = $rootScope.accessToken;
                    if (exampleAppConfig.useAccessTokenHeader) {
                        config.headers['X-Access-Token'] = accessToken;
                    } else {
                        config.url = config.url + "?token=" + accessToken;
                    }
                }
                return config || $q.when(config);
            }
        };
    })
    $urlRouterProvider.otherwise("/Home");
    $stateProvider
    .state('setpassword',{
        url : '/setpassword',
        templateUrl: 'views/SetPassword/Views/setpassword.html',
        controller : 'setpwdCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/SetPassword/JS/setpassword.js']
                })
             } 
        }
    })
    .state('forgotpassword',{
        url : '/forgotpassword',
        templateUrl: 'views/Forgotpassword/views/forgotpassword.html',
        controller : 'forgotpasswordctrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"forgotpasswordctrl",
                 files:['views/Forgotpassword/js/forgotpassword.js']
                })
             } 
        }
    })
    .state('forgotpasswordUser',{
        url : '/forgotpasswordUser',
        templateUrl: 'views/Forgotpassword/views/forgotpasswordUser.html',
        controller : 'forgotpasswordUserctrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"forgotpasswordUserctrl",
                 files:['views/Forgotpassword/js/forgotpasswordUser.js']
                })
             } 
        }
    })
    .state('resetpassword',{
        url : '/resetpassword',
        url : '/resetpassword/:employeeId',
        templateUrl: 'views/Forgotpassword/views/resetpassword.html',
        controller : 'forgotpwdputCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"resetpassword",
                 files:['views/Forgotpassword/js/resetpassword.js']
                 })
             } 
        }
    })
    .state('Admin_home.changepassword',{
        url : '/changepassword',
        templateUrl: 'views/changepassword/views/changepassword.html',
        controller : 'changepasswordCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"changepassword",
                 files:['views/changepassword/js/changepassword.js']
                })
             } 
        }
    })
    .state('User_home.changepasswordUser',{
        url : '/changepasswordUser',
        templateUrl: 'views/changepassword/views/changepasswordUser.html',
        controller : 'changepasswordUserCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"changepasswordUser",
                 files:['views/changepassword/js/changepasswordUser.js']
                })
             } 
        }
    })
    
    .state('Admin_home.profileupload',{
        url : '/profileupload',
        templateUrl: 'views/Admin_Home/Profileupload/views/profileupload.html',
        controller : 'profileuploadCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"resetpassword",
                 files:['views/Admin_Home/Profileupload/js/profileupload.js']
                })
             } 
        }
    })

    .state('Home',{
        url : '/Home',
        templateUrl: 'views/Home.html',
        controller:'homeCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['scripts/home.js']
                 })
             } 
        }
    })
    .state('Admin_login',{
        url : '/Admin_login',
        templateUrl: 'views/Admin_Home/Admin_Login/Views/Admin_login.html',
        controller : 'adminloginCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_Home/Admin_Login/JS/admin_login.js']
                })
             } 
        }
    })
    .state('Admin_home',{
        url : '/Admin_home',
        templateUrl: 'views/Admin_Home/Admin_home.html',
        controller : 'adminhomeCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['scripts/adminhome.js']
                 }),
                 $ocLazyLoad.load({
                    name :"inventApp",
                    files:['scripts/directives/admindirective.js']
                 })
             } 
        }

    })
    
    .state('Admin_home.dashboard',{
        url : '/dashboard',
        templateUrl: 'views/Admin_home/Dashboard/view/dashboard.html',
        controller : 'dashboardCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_home/Dashboard/js/dashboard.js']
                 })
             } 
        }

    })
    .state('Admin_home.viewprofile',{
        url : '/viewprofile',
        templateUrl: 'views/Admin_home/viewprofile/view/viewprofile.html',
        controller : 'viewprofile',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"viewprofile",
                 files:['views/Admin_home/viewprofile/js/viewprofile.js']
                })
             } 
        }
    })
    .state('User_home.viewprofileuser',{
        url : '/viewprofileuser',
        templateUrl: 'views/User_home/viewprofileuser/view/viewprofileuser.html',
        controller : 'viewprofile',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"viewprofile",
                 files:['views/User_home/viewprofileuser/js/viewprofileuser.js']
                })
             } 
        }
    })

    .state('Admin_home.employeeslist',{
        url : '/employeeslist',
        templateUrl : 'views/Admin_Home/Add_Employee/Views/employeeslist.html',
        controller : 'addemployeeCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_Home/Add_Employee/JS/employeeslistget.js']
                })
             } 
        }
    })
    .state('Admin_home.Addemployee',{
        url : '/Addemployee',
        templateUrl : 'views/Admin_Home/Add_Employee/Views/Addemployee.html',
        controller : 'addempctrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_Home/Add_Employee/JS/addemployee.js']
                })
             } 
        }
    })
    .state('Admin_home.Addinventory',{
        url : '/Addinventory',
        templateUrl : 'views/Admin_Home/Add_Inventory/Views/Addinventory.html',
        controller : 'addinventCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_Home/Add_Inventory/JS/addinventoryget.js']
                })
             } 
        }

    })
    .state('Admin_home.addinventorydata',{
        url : '/addinventorydata',
        templateUrl:'views/Admin_Home/Add_Inventory/Views/addinventorydata.html',
        controller : 'addinventCtrl1',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"inventApp",
                 files:['views/Admin_Home/Add_Inventory/JS/Addinventorypost.js']
                })
             } 
        }
        })
    .state('Admin_home.addinventoryedit',{

        url : '/addinventoryedit',
        templateUrl:'views/Admin_Home/Add_Inventory/Views/addinventoryedit.html',
        url : "/editinvent/:inventid",
        controller : 'addinventCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Add_Inventory/JS/Addinventoryput.js']
                    })
                } 
        }
        })
    .state('Admin_home.Assigninventory',{
        url : '/Assigninventory',
        templateUrl : 'views/Admin_Home/Assign_Inventory/Views/Assigninventory.html',
        controller : 'assigninventCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Assign_Inventory/JS/assigninventoryget.js']
                    })
                } 
        }
        })
    .state('Admin_home.assigninventorynewdata',{
        url : '/assigninventorynewdata',
        templateUrl:'views/Admin_Home/Assign_Inventory/Views/assigninventorynewdata.html',
        controller : 'assigninventCtrl1',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Assign_Inventory/JS/Assigninventorypost.js']
                    })
                } 
        }
        })
    .state('Admin_home.Assigninventory_Edit',{

        url : '/Assigninventory_Edit',
        templateUrl:'views/Admin_Home/Assign_Inventory/Views/Assigninventory_Edit.html',
        url:"/assigninventory/:assigninventid",
        controller : 'assigninventCtrledit',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Assign_Inventory/JS/Assigninventoryput.js']
                    })
                } 
        }
        })
    .state('Admin_home.Addbook',{
        url : '/Addbook',
        templateUrl : 'views/Admin_Home/Add_Books/Views/Addbook.html',
        controller : 'addbookCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Add_Books/JS/addbookget.js']
                    })
                } 
        }
        })
    .state('Admin_home.Addbookdata',{
        url : '/Addbookdata',
        templateUrl:'views/Admin_Home/Add_Books/Views/Addbookdata.html',
        controller : 'addbookCtrl1',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Add_Books/JS/Addbookpost.js']
                    })
                  } 
                }
        })
    .state('Admin_home.Addbook_Edit',{
        url : '/Addbook_Edit',
        templateUrl:'views/Admin_Home/Add_Books/Views/Addbook_Edit.html',
        url:"/Addbook/:bookid",
        controller : 'addbookCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Add_Books/JS/Addbookputedit.js']
                    })
                } 
                }
        })
    .state('Admin_home.Assignbook',{
        url : '/Assignbook',
        templateUrl : 'views/Admin_Home/Assign_Books/Views/Assignbook.html',
        controller : 'assignbookCtrl',          
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Assign_Books/JS/assignbookget.js']
                    })
                } 
                }
        })
    .state('Admin_home.Deallocatebook',{
        url : '/Deallocatebook',
        templateUrl : 'views/Admin_Home/Deallocate_Books/Views/Deallocatebook.html',
        controller : 'deallocatebookCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/Admin_Home/Deallocate_Books/JS/deallocatebook.js']
                    })
                } 
                }
        })
    .state('User_login',{
        url : '/User_login',
        templateUrl: 'views/User_Home/User_Login/Views/User_login.html',
        controller : 'userloginCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/User_Home/User_Login/JS/user_login.js']
                    })
                } 
                }
        })
    .state('User_home',{
        url : '/User_home',
        templateUrl: 'views/User_Home/Usermainhome/Views/User_home.html',
        controller : 'userhomeCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/User_Home/Usermainhome/JS/userhome.js']
                    }),
                    $ocLazyLoad.load({
                       name :"inventApp",
                       files:['scripts/directives/userhomedirective.js']
                    })
                } 
                }
        })
    .state('User_home.myinventory',{
        url : '/myinventory',
        templateUrl : 'views/User_Home/My_Inventories/Views/myinventory.html',
        controller : 'invtrqstCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/User_Home/My_Inventories/JS/myinventory.js']
                    })
                } 
                }
        })  
    .state('User_home.Searchbook',{
        url : '/Searchbook',
        templateUrl : 'views/User_Home/Book_Search/Views/Searchbook.html',
        controller : 'searchbookCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name :"inventApp",
                    files:['views/User_Home/Book_Search/JS/searchbook.js']
                    })
                } 
                }
        })
    .state('User_home.mybooks',{
        url : '/mybooks',
        templateUrl : 'views/User_Home/History_books/Views/mybooks.html',
        controller : 'mybookctrl',
        resolve : {
            lazyLoad: function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name:'mybookshistory',
                    files : ["views/User_Home/History_books/JS/mybooks.js"]
                })
            }
        }
    })
    .state('User_home.profileuploaduser',{
        url : '/profileupload',
        templateUrl: 'views/User_Home/Profileupload/views/profileuploaduser.html',
        controller : 'profileuploadCtrl',
        resolve: {
        lazyLoad:function ($ocLazyLoad) {
             return $ocLazyLoad.load({
                 name :"profileuploaduser",
                 files:['views/User_Home/Profileupload/js/profileuploaduser.js']
                })
             } 
        }
    })
    

});
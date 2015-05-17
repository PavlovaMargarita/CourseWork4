var app = angular.module("EmployeeService", ['ngRoute', 'checklist-model', 'ngCookies', 'angularFileUpload','ui.bootstrap']);

var host = "/Flower";

app.run(function ($rootScope, $cookieStore) {

    $rootScope.recordsOnPage = 5;

    $rootScope.orderStatusEnumRus = ["Новый", "Ожидает подтверждения", "Готов к обработке", "Обрабатывается", "Готов к доставке", "Доставляется", "Выполнен"];
    $rootScope.orderStatusEnum = ["NEW", "IN_CONFIRMATION", "READY_FOR_PROCESSING", "IN_PROCESSING", "READY_FOR_SHIPPING", "SHIPPING", "EXECUTED"];

    $rootScope.isAuth = function () {
        var user = $cookieStore.get("userInfo");
        if(user) {
            var role = $cookieStore.get("userInfo").role;
            $rootScope.userId = $cookieStore.get("userInfo").userId;
            $rootScope.name = $cookieStore.get("userInfo").login;
            switch (role) {
                case 'ROLE_CONFIRMATION_MANAGER':
                    $rootScope.rusRole = 'Менеджер подтверждения заказов';
                    $rootScope.role = "ROLE_CONFIRMATION_MANAGER";
                    break;
                case 'ROLE_USER':
                    $rootScope.rusRole = 'Пользователь';
                    $rootScope.role = "ROLE_USER";
                    break;
                case 'ROLE_HANDLER_MANAGER':
                    $rootScope.rusRole = 'Менеджер сборки букета';
                    $rootScope.role = "ROLE_HANDLER_MANAGER";
                    break;
                case 'ROLE_DELIVER_MANAGER':
                    $rootScope.rusRole = 'Менеджер доставки';
                    $rootScope.role = "ROLE_DELIVER_MANAGER";
                    break;
            }
            var photoURL = $cookieStore.get("photoURL");
            $('#photoEmployeeNavbar').attr('src', photoURL);
            return !(angular.isUndefined && user == null);
        }
    };

    $rootScope.hasAuthority = function (roles) {
        var user = $cookieStore.get("userInfo");
        if (typeof(user) == "undefined") {
            return false;
        }
        var userRole = user.role;
        return (roles.indexOf(userRole) > -1);
    };

    $rootScope.checkout = function(){
        $cookieStore.remove("userInfo");
    };
});

app.service('ErrorPopupService', function($timeout) {
    this.showErrorMessage = function(message){
        document.getElementById("errorOverlay").style.visibility = "visible";
        document.getElementById('errorMessage').innerHTML = message;
        $timeout(function() {
            document.getElementById("errorOverlay").style.visibility = "hidden";
        }, 3000);
    }

});

app.factory('ServerHttpResponseInterceptor', function($q, ErrorPopupService) {
    return function (promise) {
        return promise.then(function (response) {
                return response;
            },
            function (response) {
                var responseStatus = response.status;
                switch(responseStatus){
                    case 500:{
                        ErrorPopupService.showErrorMessage("При обработке запроса возникла ошибка.\r\n" +
                        "Повторите попытку позже.");
                        break;
                    }
                    case 401:{
                        ErrorPopupService.showErrorMessage("У вас нет прав доступа, или вы не авторизированы");
                        break;
                    }
                    case 403:{
                        ErrorPopupService.showErrorMessage("У вас нет прав доступа, или вы не авторизированы");
                        break;
                    }
                    //case 400:{
                    //    ErrorPopupService.showErrorMessage("Введены некорректные данные.");
                    //    break;
                    //}
                    //default:{
                    //    ErrorPopupService.showErrorMessage("При использовании программы произошла ошибка\r\n" +
                    //    "Повторите попытку позже.");
                    //    break;
                    //}
                }
                return $q.reject(response);
            });
    };
});


app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/flowers_list.html',
            controller: 'flowerListController'
        })
        .when('/login', {
            templateUrl: 'pages/authorization.html',
            controller: 'authorizationController'
        })
        .when('/orderList', {
            templateUrl: 'pages/order_list.html',
            controller: 'orderListController'
        })
        .when('/createOrder', {
            templateUrl: 'pages/order_create.html',
            controller: 'orderCreateController'
        })
        .when('/orderCorrect/:id', {
            templateUrl: 'pages/order_show.html',
            controller: 'orderCorrectController'
        })
        .when('/userList', {
            templateUrl: 'pages/user_list.html',
            controller: 'userListController'
        })
        .when('/userCreate', {
            templateUrl: 'pages/user_create.html',
            controller: 'userCreateController'
        })
        .when('/userCorrect/:id', {
            templateUrl: 'pages/user_create.html',
            controller: 'userCorrectController'
        })
        .when('/flowerList', {
            templateUrl: 'pages/flower_list.html',
            controller: 'flowerListController'
        })
        .when('/myOrderList', {
            templateUrl: 'pages/my_orders.html',
            controller: 'myOrderController'
        });


    $httpProvider.responseInterceptors.push('ServerHttpResponseInterceptor');
});

app.service('PagerService', function () {
    this.totalPageNumber = function (pageRecords, totalRecords) {
        var totalPageNumber = 1;
        if (typeof totalRecords != 'undefined') {
            totalPageNumber = Math.floor((totalRecords + pageRecords - 1) / pageRecords);
        }
        return (totalPageNumber == 0) ? 1 : totalPageNumber;
    };

    this.buildRange = function (totalPageNumber) {
        var pages = [];
        for (var i = 1; i <= totalPageNumber; i++) {
            pages.push(i);
        }
        return pages;
    };

    this.isPrevDisabled = function (currentPage) {
        return currentPage === 1 ? "disabled" : "";
    };

    this.isNextDisabled = function (currentPage, totalPageCountt) {
        return currentPage === totalPageCountt ? "disabled" : "";
    };

    this.isFirstDisabled = function (currentPage) {
        return currentPage === 1 ? "disabled" : "";
    };

    this.isLastDisabled = function (currentPage, totalPageCount) {
        return currentPage === totalPageCount ? "disabled" : "";
    }
});
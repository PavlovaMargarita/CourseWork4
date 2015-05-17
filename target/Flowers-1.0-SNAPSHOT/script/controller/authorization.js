app.controller("authorizationController", function ($scope, $http, $location, $rootScope, $cookieStore) {
    document.getElementById("loginError").style.display = "none";
    document.getElementById("passwordError").style.display = "none";
    $scope.authorization = {};

    var isSuccess = ($location.search()).success;
    if (isSuccess) {
        var response = $http({
            method: "get",
            url: host + "/user/userInfo",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        response.success(function (userInfo) {
                        $cookieStore.put("userInfo", userInfo);
                        $scope.successRedirect(userInfo);
        });
    }

    $scope.processSuccess = function () {
        var success = ($location.search()).success;
        if (success != null) {
            $scope.storeCurrentUserInfo();
        }
    };

    $scope.processError = function () {
        var isError = ($location.search()).error;
        if (isError) {
            return "Ошибка авторизации!";
        }
    };

    $scope.storeCurrentUserInfo = function () {
        $http({
            method: "get",
            url: host + "/user/userInfo",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        })
            .success(function (data) {
                $cookieStore.put("userInfo", data);
                $scope.successRedirect(data);
            })
            .error(function () {
                alert("ALERT");
            });
    };

    $scope.successRedirect = function (data) {
        if(data.role != 'ROLE_USER'){
            $location.path('/orderList');
        } else{
            $location.path('/myOrderList');
        }
        $location.replace();

    };

    $scope.authorization = {};
    $scope.authorization.doClick = function () {
        //validateObject.validateAndSubmit('#formID');
        var valid = new VacancyValidator();
        valid.validateAndSubmit('#formID');
    };
});
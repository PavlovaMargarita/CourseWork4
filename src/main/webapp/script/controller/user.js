app.controller("userListController", function ($scope, $rootScope, $http, PagerService) {
    $scope.range = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalRecords = 0;

    var response = $http({
        method: "get",
        url: host + "/user/userList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.users = data;

        var companyCount = $http({
            method: "get",
            url: host + "/user/userCount",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        companyCount.success(function (data) {
            $scope.totalRecords = Number(data);
            $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
            $scope.range = PagerService.buildRange($scope.totalPages);
        });
    });


    $scope.getRecords = {};
    $scope.getRecords.doClick = function (pageNumber) {
        var response = $http({
            method: "get",
            url: host + "/user/userList",
            params: {page: pageNumber, size: $rootScope.recordsOnPage}
        });
        response.success(function (data) {
            $scope.users = data;
            $scope.currentPage = pageNumber;
            var companyCount = $http({
                method: "get",
                url: host + "/user/userCount",
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            companyCount.success(function (data) {
                $scope.totalRecords = Number(data);
                $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
                $scope.range = PagerService.buildRange($scope.totalPages);
            });
        });
    }

});

app.controller("userCreateController", function ($scope, $rootScope, $http, $location, $cookieStore, $modal) {

    $scope.readonly = false;
    $scope.user = {};
    $scope.function = "create";
    $scope.roleList =[];
    $scope.roleList[0] = {'roleEnum': 'ROLE_CONFIRMATION_MANAGER', roleRussian: 'Менеджер подтверждения заказов'};
    $scope.roleList[1] = {'roleEnum': 'ROLE_HANDLER_MANAGER', roleRussian: 'Менеджер сборки букета'};
    $scope.roleList[2] = {'roleEnum': 'ROLE_DELIVER_MANAGER', roleRussian: 'Менеджер доставки'};
    $scope.roleList[3] = {'roleEnum': 'ROLE_USER', roleRussian: 'Пользователь'};
    $scope.user.role = 'ROLE_USER';
    $scope.location = "53, 27";

    $scope.save = {};

    $scope.save.createVerifyNumber = function(){
        var request = $http({
            method: "get",
            url: host + "/user/verifyUser",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            params: {phone : $scope.user.phone}
        });
        request.success(function (data) {
            //
            $scope.verifyNumber = data;
            var modalInstance = $modal.open({
                templateUrl: 'pages/verify_user.html',
                controller: app.verifyUserCtrl,
                resolve: {
                    verifyNumber: function(){
                        return $scope.verifyNumber;
                    }
                }
            });
        });
    };


    $scope.cancel = {};
    $scope.cancel.doClick = function () {
        $location.path('/companyList');
        $location.replace();
    };


    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(53.55, 27.33),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var createMarker = function (){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(53, 27)
        });
        $scope.markers.push(marker);
    };

    createMarker();

    $scope.changeAddress = function(){
        setTimeout(function(){
            if($scope.user.city) {
                var locationStr = "";
                locationStr += $scope.user.city;
                if($scope.user.street) {
                    locationStr += "," + $scope.user.street;
                    if($scope.user.house) {
                        locationStr += " "+$scope.user.house;
                    }
                }
                locationStr += ", Беларусь";
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': locationStr}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
                        });
                        $scope.markers[0].setMap(null);
                        $scope.markers[0] = marker;
                        $scope.map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                    }
                });
            }
        }, 3000);

    }
});

app.controller("userCorrectController", function ($scope, $http, $routeParams, $location, $rootScope) {
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(53.55, 27.33),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var createMarker = function (){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(53, 27)
        });
        $scope.markers.push(marker);
    };

    createMarker();

    $scope.changeAddress = function(){
        setTimeout(function(){
            if($scope.user.city) {
                var locationStr = "";
                locationStr += $scope.user.city;
                if($scope.user.street) {
                    locationStr += "," + $scope.user.street;
                    if($scope.user.house) {
                        locationStr += " "+$scope.user.house;
                    }
                }
                locationStr += ", Беларусь";
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': locationStr}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: $scope.map,
                            position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
                        });
                        $scope.markers[0].setMap(null);
                        $scope.markers[0] = marker;
                        $scope.map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
                    }
                });
            }
        }, 3000);

    }

    $scope.function = "edit";

    $scope.roleList =[];
    $scope.roleList[0] = {'roleEnum': 'ROLE_CONFIRMATION_MANAGER', roleRussian: 'Менеджер подтверждения заказов'};
    $scope.roleList[1] = {'roleEnum': 'ROLE_HANDLER_MANAGER', roleRussian: 'Менеджер сборки букета'};
    $scope.roleList[2] = {'roleEnum': 'ROLE_DELIVER_MANAGER', roleRussian: 'Менеджер доставки'};
    $scope.roleList[3] = {'roleEnum': 'ROLE_USER', roleRussian: 'Пользователь'};


    var id = $routeParams.id;
    if($rootScope.userId != id){
        $scope.readonly = true;
    } else {
        $scope.readonly = false;
    }
    var response = $http({
        method: "get",
        url: host + "/user/userById",
        params: {
            userId: id
        }
    });
    response.success(function (data) {
        $scope.user = data;
        $scope.changeAddress();
    });

    $scope.save = {};
    $scope.save.doClick = function () {
        var ok = true;
        if(ok) {
            var response = $http({
                method: "post",
                url: host + "/user/userCreateOrUpdate",
                data: {
                    id : $scope.user.id,
                    firstName: $scope.user.firstName,
                    lastName : $scope.user.lastName,
                    city : $scope.user.city,
                    street : $scope.user.street,
                    house : $scope.user.house,
                    flat : $scope.user.flat,
                    phone : $scope.user.phone,
                    username : $scope.user.username,
                    password : $scope.user.password,
                    role : $scope.user.role

                },
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            response.success(function () {
                $location.path('/userList');
                $location.replace();
            });
        }
    };

    $scope.cancel = {};
    $scope.cancel.doClick = function () {
        $location.path('/userList');
        $location.replace();
    }
});

singIn = function($scope, $location, $http, $cookieStore ){
    var valid = new VacancyValidator();
    valid.validateAndSubmit('#formID');

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

}
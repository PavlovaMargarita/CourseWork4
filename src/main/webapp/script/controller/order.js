app.controller("orderListController", function ($scope, $rootScope, $http, PagerService, $injector) {

    $scope.range = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalRecords = 0;
    $scope.statusForList = 'list';

    var response = $http({
        method: "get",
        url: host + "/order/orderByRole",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {managerId: $rootScope.userId, page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.orders = data;
        for(var i = 0; i < $scope.orders.length; i++){
            $scope.orders[i].status = findRusStatusAnalogue($scope.orders[i].status, $rootScope);
            $scope.orders[i].orderDescription = "";
            for(var j = 0; j < $scope.orders[i].flowerList.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList[j].flowerName + " - " + $scope.orders[i].flowerList[j].count + "шт.; ");
            }

        }

        var orderCount = $http({
            method: "get",
            url: host + "/order/orderCount",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            params: {managerId: $rootScope.userId}
        });
        orderCount.success(function (data) {
            $scope.totalRecords = Number(data);
            $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
            $scope.range = PagerService.buildRange($scope.totalPages);
        });
    });

    $scope.getRecords = {};
    $scope.getRecords.doClick = function (pageNumber) {
        var response;
        if ($scope.statusForList == 'list') {
            response = $http({
                method: "get",
                url: host + "/order/employeeList",
                params: {managerId: $rootScope.userId, page: pageNumber, size: $rootScope.recordsOnPage}
            });
            response.success(function (data) {
                $scope.orders = data;
                $scope.currentPage = pageNumber;
                var orderCount = $http({
                    method: "get",
                    url: host + "/order/orderCount",
                    dataType: 'json',
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    params: {managerId: $rootScope.userId}
                });
                orderCount.success(function (data) {
                    $scope.totalRecords = Number(data);
                    $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
                    $scope.range = PagerService.buildRange($scope.totalPages);
                });
            });
        }

    };
});

app.controller("employeeCreateController", function ($scope, $rootScope, $http, $location) {
    $scope.employee = {};
    $scope.create = true;
    $scope.showStandardPhotoAndFiredButton = false;
    $scope.editEmployeeInput = true;
    $scope.onFileSelect = function ($files) {
        $scope.photo = $files[0];
        var reader = new FileReader();
        var imgtag = document.getElementById("employeePhotoCreate");
        var photo;
        reader.onload = function (e) {
            photo = e.target.result;
            imgtag.src = photo;
        };
        reader.readAsDataURL($scope.photo);
    };

    $scope.openDateOfBirth = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedDateOfBirth = true;
    };
    $scope.openDateContractEnd = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.openedContractEnd = true;
    };


    var departments = $http({
        method: "get",
        url: "/EmployeeService/company/departmentList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json'
    });
    departments.success(function (data) {
        $scope.departments = data;
    });

    var countries = $http({
        method: "get",
        url: "/EmployeeService/country/countryList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json'
    });
    countries.success(function (data) {
        $scope.countries = data;
        $scope.country = {};
        $scope.country.id = $scope.countries[0].id;
    });

    var position = $http({
        method: "get",
        url: "/EmployeeService/company/positionInCompanyList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json'
    });
    position.success(function (data) {
        $scope.positions = data;
        $scope.position = {};
        $scope.position.id = $scope.positions[0].id;
    });

    $scope.sexList = [];
    $scope.sexList[0] = {'sexEnum': 'MALE', sexRussian: 'Мужской'};
    $scope.sexList[1] = {'sexEnum': 'FEMALE', sexRussian: 'Женский'};
    $scope.employee.sex = $scope.sexList[0].sexEnum;

    var role = $http({
        method: "get",
        url: "/EmployeeService/employee/roleList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json'
    });
    role.success(function (data) {
        $scope.roleList = [];
        data.forEach(addRoleName);
        function addRoleName(element) {
            var value;
            switch (element) {
                case 'ROLE_HRM':
                    value = {roleEnum: element, roleTranslate: 'HRM'};
                    $scope.roleList.push(value);
                    break;
                case 'ROLE_ADMIN':
                    value = {roleEnum: element, roleTranslate: 'Администратор'};
                    $scope.roleList.push(value);
                    break;
                case 'ROLE_EMPLOYEE':
                    value = {roleEnum: element, roleTranslate: 'Сотрудник'};
                    $scope.roleList.push(value);
                    break;
            }
        }

        $scope.employee.role = $scope.roleList[0].roleEnum;
    });

    $scope.save = {};
    $scope.save.doClick = function () {
        var ok = validateObject.validate("#createEmployeeForm");
        if (ok) {
            $scope.address = {};
            $scope.department = {};
            var response = $http({
                method: "post",
                url: "/EmployeeService/employee/saveEmployeeCreate",
                data: {
                    first_name: $scope.employee.first_name,
                    last_name: $scope.employee.last_name,
                    sex: $scope.employee.sex,
                    dateOfBirth: $scope.employee.dateOfBirth,
                    countryId: $scope.country.id,
                    city: $scope.employee.city,
                    street: $scope.employee.street,
                    house: $scope.employee.house,
                    flat: $scope.employee.flat,
                    addressId: $scope.address.id,
                    departmentId: $scope.department.id,
                    positionInCompanyId: $scope.position.id,
                    dateContractEnd: $scope.employee.dateContractEnd,
                    fired: false,
                    firedComment: '',
                    photoURL: 't',
                    login: $scope.employee.login,
                    password: $scope.employee.password,
                    role: $scope.employee.role,
                    companyId: $scope.employee.companyId,
                    email: $scope.employee.email
                },
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            response.success(function (data) {
                if ($scope.photo) {
                    var fd = new FormData();
                    fd.append('idEmployee', data);
                    fd.append("photo", $scope.photo);
                    $http({
                        method: 'POST',
                        url: '/EmployeeService/employee/uploadPhoto',
                        headers: {'Content-Type': undefined},
                        data: fd,
                        transformRequest: angular.identity
                    });
                    //.success(function () {
                    //    $location.path('/employeeList');
                    //    $location.replace();
                    //});
                } else {
                    $location.path('/employeeList');
                    $location.replace();
                }
            });
        }
    };

    $scope.changeDepartment = {};
    $scope.changeDepartment.change = function () {
        loadAddress($scope.department.id, $http, $scope);
    };

    $scope.loadPhotoButton = {};
    $scope.loadPhotoButton.doClick = function () {
        document.getElementById('photoFileID').click();
    };

    $scope.cancel = {};
    $scope.cancel.doClick = function () {
        $location.path('/employeeList');
        $location.replace();
    }
});

app.controller("orderCorrectController", function ($scope, $http, $routeParams, $location, $rootScope) {

    $scope.maxStatusIndex = 0;
    if($rootScope.role == "ROLE_CONFIRMATION_MANAGER"){
        $scope.maxStatusIndex = 2;
    }
    if($rootScope.role == "ROLE_HANDLER_MANAGER"){
        $scope.maxStatusIndex = 4;
    }
    if($rootScope.role == "ROLE_DELIVER_MANAGER"){
        $scope.maxStatusIndex = 6;
    }

    var id = Number($routeParams.id);

    var response = $http({
        method: "get",
        url: host + "/order/orderById",
        params: {
            orderId: id
        }
    });
    response.success(function (data) {
        $scope.order = data;

        $scope.orderStatusIndex = -1;
        for (var i = 0; i < $scope.orderStatusEnum.length; i++) {
            if ($scope.order.status == $scope.orderStatusEnum[i]) {
                $scope.order.status = $scope.orderStatusEnumRus[i];
                $scope.orderStatusIndex = i;
            }
        }
    });

    $scope.changeStatus = function(){
        if($scope.orderStatusIndex + 1 <= $scope.maxStatusIndex) {
            $scope.orderStatusIndex++;
            $scope.order.status = $scope.orderStatusEnumRus[$scope.orderStatusIndex];
        }
    };

    $scope.save = {};
    $scope.save.doClick = function () {

        var status = $scope.orderStatusEnum[$scope.orderStatusIndex];
        var response = $http({
            method: "post",
            url: host + "/order/managerOrderUpdate",
            data: {
                orderId: $scope.order.id,
                status: status
            },
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        response.success(function (data) {
            $location.path('/orderList');
            $location.replace();
        });

    };


    $scope.cancel = {};
    $scope.cancel.doClick = function () {
        $location.path('/orderList');
        $location.replace();
    }
});

findRusStatusAnalogue = function(value, $rootScope) {
    for (var i = 0; i < $rootScope.orderStatusEnum.length; i++) {
        if (value == $rootScope.orderStatusEnum[i]) {
            return $rootScope.orderStatusEnumRus[i];
        }
    }
};

app.controller("myOrderController", function ($scope, $http, $routeParams, $location, $rootScope, PagerService ) {
    $scope.range = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalRecords = 0;
    $scope.statusForList = 'list';

    var response = $http({
        method: "get",
        url: host + "/order/orderByUser",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {userId: $rootScope.userId, page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.orders = data;
        for(var i = 0; i < $scope.orders.length; i++){
            $scope.orders[i].status = findRusStatusAnalogue($scope.orders[i].status, $rootScope);
            $scope.orders[i].orderDescription = "";
            for(var j = 0; j < $scope.orders[i].flowerList.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList[j].flowerName + " - " + $scope.orders[i].flowerList[j].count + "шт.; ");
            }

        }

        var orderCount = $http({
            method: "get",
            url: host + "/order/userOrderCount",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            params: {userId: $rootScope.userId}
        });
        orderCount.success(function (data) {
            $scope.totalRecords = Number(data);
            $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
            $scope.range = PagerService.buildRange($scope.totalPages);
        });
    });

    $scope.getRecords = {};
    $scope.getRecords.doClick = function (pageNumber) {
        var response;
        if ($scope.statusForList == 'list') {
            response = $http({
                method: "get",
                url: host + "/order/orderByUser",
                params: {userId: $rootScope.userId, page: pageNumber, size: $rootScope.recordsOnPage}
            });
            response.success(function (data) {
                $scope.orders = data;
                $scope.currentPage = pageNumber;
                var orderCount = $http({
                    method: "get",
                    url: host + "/order/userOrderCount",
                    dataType: 'json',
                    contentType: 'application/json',
                    mimeType: 'application/json',
                    params: {userId: $rootScope.userId}
                });
                orderCount.success(function (data) {
                    $scope.totalRecords = Number(data);
                    $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
                    $scope.range = PagerService.buildRange($scope.totalPages);
                });
            });
        }

    };
});
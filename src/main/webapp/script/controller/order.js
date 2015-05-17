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

app.controller("orderCreateController", function ($scope, $rootScope, $http, $location,$routeParams) {

    $scope.orderInfo = $rootScope.orderInfo;
    var flowerIdArray = [];
    $scope.indexArray = [];
    for(var i = 0; i < $scope.orderInfo.length; i++){
        if($scope.orderInfo[i].isChecked){
            flowerIdArray.push(Number($scope.orderInfo[i].flowerId));
            $scope.indexArray.push(i);
        }
    }
    var getFlowerById = $http({
        method: "get",
        url: host + "/flower/flowerListById",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {flowerIdList: flowerIdArray}
    });
    getFlowerById.success(function (data) {
        $scope.flowers = data;
        $scope.order = [];
        for(var i = 0; i < $scope.flowers.length; i++){
            for(var j = 0; j < $scope.indexArray.length; j++){
                if($scope.flowers[i].id == $scope.orderInfo[$scope.indexArray[j]].flowerId){
                    $scope.order.push({flower:$scope.flowers[i], count: $scope.orderInfo[$scope.indexArray[j]].count});
                    break;
                }
            }
        }

    });

    $scope.save = function(){
        var flowerList = [];
        for(var i = 0; i < $scope.order.length; i++){
            flowerList.push({flowerId : $scope.order[i].flower.id, count : $scope.order[i].count});
        }
        var response = $http({
            method: "post",
            url: host + "/order/orderCreate",
            data: {
                flowerList : flowerList
            },
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        response.success(function () {
            $location.path('/myOrderList');
            $location.replace();
        });

    };


    $scope.cancel = {};
    $scope.cancel.doClick = function () {
        $location.path('/orderList');
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
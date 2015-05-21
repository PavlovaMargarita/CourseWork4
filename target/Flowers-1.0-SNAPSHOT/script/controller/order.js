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
            for(var j = 0; j < $scope.orders[i].flowerList1.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList1[j].flowerName + " - " + $scope.orders[i].flowerList1[j].count + "шт.; ");
            }
            for(var j = 0; j < $scope.orders[i].flowerList2.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList2[j].flowerName + " - " + $scope.orders[i].flowerList2[j].count + "шт.; ");
            }
            for(var j = 0; j < $scope.orders[i].flowerList3.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList3[j].flowerName + " - " + $scope.orders[i].flowerList3[j].count + "шт.; ");
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

    $scope.orderInfo1 = $rootScope.orderInfo1;
    $scope.orderInfo2 = $rootScope.orderInfo2;
    $scope.orderInfo3 = $rootScope.orderInfo3;
    var flowerIdArray1 = [];
    var flowerIdArray2 = [];
    var flowerIdArray3 = [];
    $scope.indexArray1 = [];
    $scope.indexArray2 = [];
    $scope.indexArray3 = [];
    for(var i = 0; i < $scope.orderInfo1.length; i++){
        if($scope.orderInfo1[i].isChecked){
            flowerIdArray1.push(Number($scope.orderInfo1[i].flowerId));
            $scope.indexArray1.push(i);
        }
    }
    for(var i = 0; i < $scope.orderInfo2.length; i++){
        if($scope.orderInfo2[i].isChecked){
            flowerIdArray2.push(Number($scope.orderInfo2[i].flowerId));
            $scope.indexArray2.push(i);
        }
    }
    for(var i = 0; i < $scope.orderInfo3.length; i++){
        if($scope.orderInfo3[i].isChecked){
            flowerIdArray3.push(Number($scope.orderInfo3[i].flowerId));
            $scope.indexArray3.push(i);
        }
    }
    var getFlowerById = $http({
        method: "get",
        url: host + "/flower/flowerListById",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {flowerIdList: flowerIdArray1}
    });
    getFlowerById.success(function (data) {
        $scope.flowers1 = data;
        $scope.order1 = [];
        for(var i = 0; i < $scope.flowers1.length; i++){
            for(var j = 0; j < $scope.indexArray1.length; j++){
                if($scope.flowers1[i].id == $scope.orderInfo1[$scope.indexArray1[j]].flowerId){
                    $scope.order1.push({flower:$scope.flowers1[i], count: $scope.orderInfo1[$scope.indexArray1[j]].count});
                    break;
                }
            }
        }

    });

    getFlowerById = $http({
        method: "get",
        url: host + "/flower/flowerListById",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {flowerIdList: flowerIdArray2}
    });
    getFlowerById.success(function (data) {
        $scope.flowers2 = data;
        $scope.order2 = [];
        for(var i = 0; i < $scope.flowers2.length; i++){
            for(var j = 0; j < $scope.indexArray2.length; j++){
                if($scope.flowers2[i].id == $scope.orderInfo2[$scope.indexArray2[j]].flowerId){
                    $scope.order2.push({flower:$scope.flowers2[i], count: $scope.orderInfo2[$scope.indexArray2[j]].count});
                    break;
                }
            }
        }

    });

    getFlowerById = $http({
        method: "get",
        url: host + "/flower/flowerListById",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {flowerIdList: flowerIdArray3}
    });
    getFlowerById.success(function (data) {
        $scope.flowers3 = data;
        $scope.order3 = [];
        for(var i = 0; i < $scope.flowers3.length; i++){
            for(var j = 0; j < $scope.indexArray3.length; j++){
                if($scope.flowers3[i].id == $scope.orderInfo3[$scope.indexArray3[j]].flowerId){
                    $scope.order3.push({flower:$scope.flowers3[i], count: $scope.orderInfo3[$scope.indexArray3[j]].count});
                    break;
                }
            }
        }

    });

    $scope.save = function(){
        var flowerList1 = [];
        var flowerList2 = [];
        var flowerList3 = [];
        for(var i = 0; i < $scope.order1.length; i++){
            flowerList1.push({flowerId : $scope.order1[i].flower.id, count : $scope.order1[i].count});
        }
        for(var i = 0; i < $scope.order2.length; i++){
            flowerList2.push({flowerId : $scope.order2[i].flower.id, count : $scope.order2[i].count});
        }
        for(var i = 0; i < $scope.order3.length; i++){
            flowerList3.push({flowerId : $scope.order3[i].flower.id, count : $scope.order3[i].count});
        }
        var response = $http({
            method: "post",
            url: host + "/order/orderCreate",
            data: {
                flowerList1 : flowerList1,
                flowerList2 : flowerList2,
                flowerList3 : flowerList3
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
            for(var j = 0; j < $scope.orders[i].flowerList1.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList1[j].flowerName + " - " + $scope.orders[i].flowerList1[j].count + "шт.; ");
            }
            for(var j = 0; j < $scope.orders[i].flowerList2.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList2[j].flowerName + " - " + $scope.orders[i].flowerList2[j].count + "шт.; ");
            }
            for(var j = 0; j < $scope.orders[i].flowerList3.length; j++){
                $scope.orders[i].orderDescription += ($scope.orders[i].flowerList3[j].flowerName + " - " + $scope.orders[i].flowerList3[j].count + "шт.; ");
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
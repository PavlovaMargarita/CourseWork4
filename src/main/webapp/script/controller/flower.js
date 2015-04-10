app.controller("flowerListController", function ($scope, $rootScope, $http, PagerService, $location) {
    $scope.range = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalRecords = 0;
    $scope.recordsOnPage = $rootScope.recordsOnPage;

    var response = $http({
        method: "get",
        url: host + "/flower/flowerList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.flowers = data;

        var flowerCount = $http({
            method: "get",
            url: host + "/flower/flowerCountList",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        flowerCount.success(function (data) {
            $scope.checkInfo = [];
            $scope.costByFlowerCount = [];
            for(var i = 0; i < data; i++){
                $scope.checkInfo[i] = {flowerId:0, isChecked: false, count: 0, cost:0};
            }
            for(var i = 0; i < $scope.flowers.length; i++){
                $scope.checkInfo[i] = {flowerId: $scope.flowers[i].id, isChecked: false, count: 0, cost: $scope.flowers[i].cost};
            }

            $scope.totalRecords = Number(data);
            $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
            $scope.range = PagerService.buildRange($scope.totalPages);
        });
    });


    $scope.getRecords = {};
    $scope.getRecords.doClick = function (pageNumber) {
        var response = $http({
            method: "get",
            url: host + "/flower/flowerList",
            params: {page: pageNumber, size: $rootScope.recordsOnPage}
        });
        response.success(function (data) {
            $scope.flowers = data;
            $scope.currentPage = pageNumber;
            var vacancyCount = $http({
                method: "get",
                url: host + "/flower/flowerCountList",
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            vacancyCount.success(function (data) {
                $scope.totalRecords = Number(data);
                $scope.totalPages = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords);
                $scope.range = PagerService.buildRange($scope.totalPages);
            });
        });
    };

    $scope.status = false;

    $scope.check = function(value){
        $scope.checkInfo[value].isChecked = !$scope.checkInfo[value].isChecked;
        //$("#"+value).s
        $scope.status = !$scope.status;
    };

    $scope.totalCost = 0;
    $scope.getTotalCost = function(){
        var sum = 0;
        for(var i=0;i <  $scope.checkInfo.length; i++){
            sum += ($scope.checkInfo[i].cost * $scope.checkInfo[i].count);
        }
        $scope.totalCost = sum;
    };

    $scope.createOrder = function(){
        $rootScope.orderInfo = $scope.checkInfo;
        $location.path('/createOrder');
        $location.replace();
    }

});
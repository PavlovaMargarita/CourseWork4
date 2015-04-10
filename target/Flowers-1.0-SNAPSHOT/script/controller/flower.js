app.controller("flowerListController", function ($scope, $rootScope, $http, PagerService) {
    $scope.range = [];
    $scope.currentPage = 1;
    $scope.totalPages = 1;
    $scope.totalRecords = 0;

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

        var vacancyCount = $http({
            method: "get",
            url: host + "/flower/flowerCountList",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        vacancyCount.success(function (data) {
            $scope.checkInfo = {};
            for(var i = 0; i < data; i++){
                $scope.checkInfo[i] = {flowerId:0,isChecked: false, count: 0};
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
    }

    $scope.check = function(value){
        console.log("value");
    }

});
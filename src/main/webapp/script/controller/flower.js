app.controller("flowerListController", function ($scope, $rootScope, $http, PagerService, $location) {
    $scope.range = [];
    $scope.currentPage1 = 1;
    $scope.currentPage2 = 1;
    $scope.currentPage3 = 1;
    $scope.totalPages1 = 1;
    $scope.totalPages2 = 1;
    $scope.totalPages3 = 1;
    $scope.totalRecords1 = 0;
    $scope.totalRecords2 = 0;
    $scope.totalRecords3 = 0;
    $scope.recordsOnPage = $rootScope.recordsOnPage;
    $scope.selected = 1;

    var response = $http({
        method: "get",
        url: host + "/rules/rulesList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {}
    });
    response.success(function (data) {
        $scope.rules = data;
    });

    var response = $http({
        method: "get",
        url: host + "/flower/bouquetList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.flowers2 = data;

        var flowerCount = $http({
            method: "get",
            url: host + "/flower/bouquetCountList",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        flowerCount.success(function (data) {
            $scope.checkInfo2 = [];
            for(var i = 0; i < data; i++){
                $scope.checkInfo2[i] = {flowerId:0, isChecked: false, count: 0, cost:0, style:""};
            }
            for(var i = 0; i < $scope.flowers1.length; i++){
                $scope.checkInfo2[i] = {flowerId: $scope.flowers2[i].id, isChecked: false, count: 0, cost: $scope.flowers2[i].cost, style:$scope.flowers2[i].style};
            }

            $scope.totalRecords2 = Number(data);
            $scope.totalPages2 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords2);
            $scope.range2 = PagerService.buildRange($scope.totalPages2);
        });
    });

    var response = $http({
        method: "get",
        url: host + "/flower/flowerList",
        dataType: 'json',
        contentType: 'application/json',
        mimeType: 'application/json',
        params: {page: 1, size: $rootScope.recordsOnPage}
    });
    response.success(function (data) {
        $scope.flowers1 = data;
        $scope.flowers3 = data;

        var flowerCount = $http({
            method: "get",
            url: host + "/flower/flowerCountList",
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json'
        });
        flowerCount.success(function (data) {
            $scope.checkInfo1 = [];
            $scope.checkInfo3 = [];
            for(var i = 0; i < data; i++){
                $scope.checkInfo1[i] = {flowerId:0, isChecked: false, count: 0, cost:0, style:""};
                $scope.checkInfo3[i] = {flowerId:0, isChecked: false, count: 0, cost:0, style:""};
            }
            for(var i = 0; i < $scope.flowers1.length; i++){
                $scope.checkInfo1[i] = {flowerId: $scope.flowers1[i].id, isChecked: false, count: 0, cost: $scope.flowers1[i].cost, style:$scope.flowers1[i].style};
                $scope.checkInfo3[i] = {flowerId: $scope.flowers1[i].id, isChecked: false, count: 0, cost: $scope.flowers1[i].cost, style:$scope.flowers1[i].style};
            }

            $scope.totalRecords1 = Number(data);
            $scope.totalRecords3 = Number(data);
            $scope.totalPages1 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords1);
            $scope.totalPages3 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords3);
            $scope.range1 = PagerService.buildRange($scope.totalPages1);
            $scope.range3 = PagerService.buildRange($scope.totalPages3);
        });
    });


    $scope.getRecords = {};
    $scope.getRecords.doClick1 = function (pageNumber) {
        var response = $http({
            method: "get",
            url: host + "/flower/flowerList",
            params: {page: pageNumber, size: $rootScope.recordsOnPage}
        });
        response.success(function (data) {
            $scope.flowers1 = data;

            for(var i = 0; i < $scope.flowers1.length; i++){
                if(!$scope.checkInfo1[(pageNumber - 1)*$rootScope.recordsOnPage + i]) {
                    $scope.checkInfo1[(pageNumber - 1) * $rootScope.recordsOnPage + i] = {
                        flowerId: $scope.flowers1[i].id,
                        isChecked: false,
                        count: 0,
                        cost: $scope.flowers1[i].cost,
                        style: $scope.flowers1[i].style
                    };
                }
            }

            $scope.currentPage1 = pageNumber;
            var vacancyCount = $http({
                method: "get",
                url: host + "/flower/flowerCountList",
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            vacancyCount.success(function (data) {
                $scope.totalRecords1 = Number(data);
                $scope.totalPages1 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords1);
                $scope.range1 = PagerService.buildRange($scope.totalPages1);
            });
        });
    };

    $scope.getRecords.doClick2 = function (pageNumber) {
        var response = $http({
            method: "get",
            url: host + "/flower/bouquetList",
            params: {page: pageNumber, size: $rootScope.recordsOnPage}
        });
        response.success(function (data) {
            $scope.flowers2 = data;

            for(var i = 0; i < $scope.flowers2.length; i++){
                if(!$scope.checkInfo2[(pageNumber - 1)*$rootScope.recordsOnPage + i]) {
                    $scope.checkInfo2[(pageNumber - 1) * $rootScope.recordsOnPage + i] = {
                        flowerId: $scope.flowers2[i].id,
                        isChecked: false,
                        count: 0,
                        cost: $scope.flowers2[i].cost,
                        style: $scope.flowers2[i].style
                    };
                }
            }

            $scope.currentPage2 = pageNumber;
            var vacancyCount = $http({
                method: "get",
                url: host + "/flower/bouquetCountList",
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            vacancyCount.success(function (data) {
                $scope.totalRecords2 = Number(data);
                $scope.totalPages2 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords2);
                $scope.range2 = PagerService.buildRange($scope.totalPages2);
            });
        });
    };

    $scope.getRecords.doClick3 = function (pageNumber) {
        var response = $http({
            method: "get",
            url: host + "/flower/flowerList",
            params: {page: pageNumber, size: $rootScope.recordsOnPage}
        });
        response.success(function (data) {
            $scope.flowers3 = data;

            for(var i = 0; i < $scope.flowers3.length; i++){
                if(!$scope.checkInfo3[(pageNumber - 1)*$rootScope.recordsOnPage + i]) {
                    $scope.checkInfo3[(pageNumber - 1) * $rootScope.recordsOnPage + i] = {
                        flowerId: $scope.flowers3[i].id,
                        isChecked: false,
                        count: 0,
                        cost: $scope.flowers3[i].cost,
                        style: $scope.flowers3[i].style
                    };
                }
            }

            $scope.currentPage3 = pageNumber;
            var vacancyCount = $http({
                method: "get",
                url: host + "/flower/flowerCountList",
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            vacancyCount.success(function (data) {
                $scope.totalRecords3 = Number(data);
                $scope.totalPages3 = PagerService.totalPageNumber($rootScope.recordsOnPage, $scope.totalRecords3);
                $scope.range3 = PagerService.buildRange($scope.totalPages3);
            });
        });
    };

    $scope.status = false;

    $scope.check1 = function(value){
        $scope.checkInfo1[value].isChecked = !$scope.checkInfo1[value].isChecked;
        //$("#"+value).s
        $scope.status = !$scope.status;
        $scope.getTotalCost();
    };

    $scope.check2 = function(value){
        $scope.checkInfo2[value].isChecked = !$scope.checkInfo2[value].isChecked;
        //$("#"+value).s
        $scope.status = !$scope.status;
        $scope.getTotalCost();
    };

    $scope.check3 = function(value){
        $scope.checkInfo3[value].isChecked = !$scope.checkInfo3[value].isChecked;
        //$("#"+value).s
        $scope.status = !$scope.status;
        $scope.getTotalCost();
    };

    $scope.totalCost = 0;
    $scope.getTotalCost = function(){
        var sum = 0;
        for(var i=0;i <  $scope.checkInfo1.length; i++){
            if(!Number($scope.checkInfo1[i].count)){
                $scope.checkInfo1[i].count = 0;
            }
            if($scope.checkInfo1[i].isChecked) {
                sum += ($scope.checkInfo1[i].cost * $scope.checkInfo1[i].count);
            }
        }

        for(var i=0;i <  $scope.checkInfo2.length; i++){
            if(!Number($scope.checkInfo2[i].count)){
                $scope.checkInfo2[i].count = 0;
            }
            if($scope.checkInfo2[i].isChecked) {
                sum += ($scope.checkInfo2[i].cost * $scope.checkInfo2[i].count);
            }
        }

        for(var i=0;i <  $scope.checkInfo3.length; i++){
            if(!Number($scope.checkInfo3[i].count)){
                $scope.checkInfo3[i].count = 0;
            }
            if($scope.checkInfo3[i].isChecked) {
                sum += ($scope.checkInfo3[i].cost * $scope.checkInfo3[i].count);
            }
        }
        $scope.totalCost = sum;
        if($scope.totalCost != 0){
            var ok = $scope.checkOkOrder();
            if(!ok) {

                $('#create_order').attr('data-content', $scope.checkOkOrderStr);
                $('#create_order').attr('data-trigger', "hover");
                $('#create_order').popover("show");
            } else {
                $('#create_order').removeAttr('data-content');
                $('#create_order').removeAttr('data-trigger');
                $("#create_order").popover('destroy')
            }
        }else {
            $('#create_order').removeAttr('data-content');
            $('#create_order').removeAttr('data-trigger');
            $("#create_order").popover('destroy')
        }
    };

    $scope.checkOkOrder = function(){
        var ok = true;
        $scope.checkOkOrderStr = "Флористы не рекомендуют сочетать: ";
        var length = 0;
        for(var i = 0; i < $scope.rules.length; i++){
            if($scope.isContainFlower($scope.rules[i].flower1Id) && $scope.isContainFlower($scope.rules[i].flower2Id)){
                if(length == 0) {
                    $scope.checkOkOrderStr += $scope.rules[i].flower1Name + " и " + $scope.rules[i].flower2Name;

                } else {
                    $scope.checkOkOrderStr += ", "+$scope.rules[i].flower1Name + " " + $scope.rules[i].flower2Name;
                }
                length++;
                ok = false;
            }
        }
        return ok;
    };

    $scope.isContainFlower = function(flowerId){
        for(var i = 0; i < $scope.checkInfo1.length; i++){
            if($scope.checkInfo3[i].flowerId == flowerId && $scope.checkInfo3[i].isChecked == true){
                return true;
            }
        }
        return false;
    };

    $scope.createOrder = function(){
        $rootScope.orderInfo1 = $scope.checkInfo1;
        $rootScope.orderInfo2 = $scope.checkInfo2;
        $rootScope.orderInfo3 = $scope.checkInfo3;
        if($rootScope.isAuth() == undefined){
            $('#shouldAutorize').css("display", "inline");
            setTimeout(function() {
            $('#shouldAutorize').fadeOut('fast');
            }, 3000);
        } else {
            //$rootScope.orderInfo = $scope.checkInfo;
            $location.path('/createOrder');
            $location.replace();
        }
    };

    $scope.selectTab = function (tab) {
        $("#tab" + $scope.selected).removeClass("active");
        $scope.selected = tab;
        $("#tab" + $scope.selected).addClass("active");

    }

});
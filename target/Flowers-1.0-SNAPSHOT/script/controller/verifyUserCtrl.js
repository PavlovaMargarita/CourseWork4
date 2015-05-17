app.verifyUserCtrl =  function($scope, verifyNumber, $location, $http, $cookieStore, $modalInstance){
    $scope.verificationCode = "";
    $scope.verify = function(){
        if($scope.verificationCode == verifyNumber){
            $scope.createUser();
        }
    };

    $scope.createUser = function () {
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
                if($rootScope.role) {
                    $location.path('/userList');
                    $location.replace();
                } else {
                    $scope.username =  $scope.user.username;
                    $scope.password =  $scope.user.password;
                    singIn($scope, $location, $http, $cookieStore);
                }
            });
        }
    };

    $scope.test = {};
    $scope.test.cancel = function(){
        $modalInstance.close();
    }

};

//app.controller("verifyUserCtrl11", app.verifyUserCtrl());
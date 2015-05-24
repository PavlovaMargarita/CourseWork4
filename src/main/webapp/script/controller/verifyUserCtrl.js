app.verifyUserCtrl =  function($scope, verifyNumber, user, $location, $http, $cookieStore, $modalInstance, $rootScope){
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
                    id : user.id,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    city : user.city,
                    street : user.street,
                    house : user.house,
                    flat : user.flat,
                    phone : user.phone,
                    username : user.username,
                    password : user.password,
                    role : user.role

                },
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json'
            });
            response.success(function () {
                $modalInstance.close();
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
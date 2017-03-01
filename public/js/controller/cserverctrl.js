/**
 * Created by bhanu.mokkala on 2/21/2017.
 */
angular.module('infralab')
    .controller('cserverctrl', function($scope, $http) {
        $scope.updation = false;
        $scope.updationmsg = false;
        $http.get('\getimagelist')
            .then(function(images){
                console.log(images);
                $scope.images = images.data;
            });
        $http.get('\getflavorlist')
            .then(function(flavors){
                console.log(flavors);
                $scope.flavors = flavors.data;
            });
        $scope.createserver= function (img, fla, nm){
            console.log(nm);
            var data = $.param({
                image: img,
                flavor: fla,
                name: nm
            });
            $scope.updation = true;
            $http.post('/createserver?' + data)
                .then(function (data) {
                    //console.log(data);
                    //$scope.results = false;
                    $scope.updation = false;
                    $scope.updationmsg = true;
                    $scope.updatemsg = "Successfully created the server. Server ID: " + data.data.id;
                }, function (error) {
                    console.log('Error: ' + error);
                });
        };

    });
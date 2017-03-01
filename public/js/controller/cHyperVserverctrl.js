/**
 * Created by bhanu.mokkala on 2/21/2017.
 */
angular.module('infralab')
    .controller('cHyperVserverctrl', function($scope, $http) {

        $scope.updationmsg = false;

        $scope.images = [
            {
                "id" : "1",
                "name" : "Citrix-Elearning-Ansible"
            },
            {
                "id" : "2",
                "name" : "Citrix-Elearning-Chef"
            },
            {
                "id" : "3",
                "name" : "Citrix-Elearning-Pupet"
            }                        
        ];

            $scope.createserver = function() {
        var data = {
		                "instancename" : $scope.image
                    };
            $http.post('/createhypervvm', data)
                .then(function (data) {
                    console.log(data);
                    $scope.updationmsg = true;
                }, function (error) {
                    console.log('Error: ' + error);
                });
    }
    });
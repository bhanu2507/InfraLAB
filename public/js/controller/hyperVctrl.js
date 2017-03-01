/**
 * Created by bhanu.mokkala on 2/20/2017.
 */

angular.module('infralab')
    .controller('hyperVctrl', function($scope, $http) {

        $http.get('/gethypervvm')
            .then(function (data) {
                console.log(data);
            });
});

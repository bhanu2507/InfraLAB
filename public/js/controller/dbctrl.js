/**
 * Created by bhanu.mokkala on 2/20/2017.
 */

angular.module('infralab')
    .controller('dbctrl', function($scope, $http) {

        $scope.loading = true;
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.currentPage = 1;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };

        $http.get('/getaccesskey')
            .then(function (data) {
               // $scope.accesskey = data.data;
                var str = data.data;
               //console.log(data);
                //console.log(str.substr(0,8) + "-" + str.substr(8,4) + "-" + str.substr(12,4) + "-" + str.substr(16,4) + "-" + str.substr(20,32));
                //$scope.accesskey = str.substr(0,8) + "-" + str.substr(8,4) + "-" + str.substr(12,4) + "-" + str.substr(16,4) + "-" + str.substr(20,32)
                $scope.accesskey = "15a1d720-1f4a-4bfa-aa73-85bf8600ca89";
            });

        $http.get('/getcompulist')
            .then(function (data) {
                console.log(data.data);
                $scope.loading = false;
                $scope.oscs = data.data;
                $scope.totalItems = $scope.oscs.length;
                $scope.paginate = function (value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.numPerPage;
                    end = begin + $scope.numPerPage;
                    index = $scope.oscs.indexOf(value);
                    return (begin <= index && index < end);
                };
            },function (error) {
                console.log('Error: ' + data);
            });

        $scope.numPerPage = 5;

});

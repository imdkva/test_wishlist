wishlistApp.controller('wishlistController', ['$scope', 'wishlistStorage', 'catalogStorage',
    function ($scope, wishlistStorage, catalogStorage) {

        catalogStorage.load().then(function (data) {
            $scope.games = data;
            $scope.initWishes();
        });


        $scope.initWishes = function () {
            var wishes = wishlistStorage.getWishesIds();
            $scope.wishes = Object.create(null);
            for (var key in $scope.games) {
                if (wishes.indexOf(key) > -1) {
                    $scope.wishes[key] = $scope.games[key];
                    $scope.games[key].checked = true;
                }
            }
            $scope.updateSum();
        };

        $scope.put = function (gameId) {
            wishlistStorage.addWishId(gameId);
            $scope.wishes[gameId] = $scope.games[gameId];
            $scope.games[gameId].checked = true;
            $scope.updateSum();
        };

        $scope.remove = function (gameId) {
            wishlistStorage.delWishId(gameId);
            delete $scope.wishes[gameId];
            $scope.games[gameId].checked = false;
            $scope.updateSum();
        };

        $scope.clear = function () {
            localStorage.clear();
            $scope.wishes = Object.create(null);
            for (var key in $scope.games) {
                $scope.games[key].checked = false;
            }
            $scope.updateSum();
        };

        $scope.updateSum = function () {
            var result = 0;
            var nan = false;

            for (var key in $scope.wishes) {
                if ($scope.wishes[key].price != undefined) {
                    result += $scope.wishes[key].price;
                }
                else nan = true;
            }

            $scope.sum = result;
            if (nan) $scope.sum = "~" + $scope.sum;
        };

}]);

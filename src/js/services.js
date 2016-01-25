wishlistApp.factory ('wishlistStorage', function () {

    var service = {

        getWishesIds: function() {
            var result = JSON.parse(localStorage.getItem("wishes"));
            if (result == null) result = [];
            return result;
        },

        addWishId : function (id) {
            var wishes = service.getWishesIds();
            if (wishes.indexOf(id) == -1) wishes.push(id);
            localStorage.setItem("wishes", JSON.stringify(wishes));
        },

        delWishId : function (id) {
            var wishes = service.getWishesIds();
            if (wishes.indexOf(id) > -1) wishes.splice(wishes.indexOf(id), 1);
            localStorage.setItem("wishes", JSON.stringify(wishes));
        }
    };

    return service;

});


wishlistApp.factory ('catalogStorage', ['$http', '$q', function ($http, $q) {

    var service = {

        load: function() {
            var deferred = $q.defer();

            $http.get('resource/products.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        }
    };

    return service;

}]);



/**
 * Created by panktibhalani on 2/14/17.
 */

/**
 * Created by panktibhalani on 2/14/17.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService($http) {


        var api = {

            "createWebsiteForUser": createWebsiteForUser,
            "findAllWebsitesForUser": findAllWebsitesForUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        function updateWebsite(wId, newWebsite) {
            return $http.put("/api/website/" + wId,newWebsite);
        }

        function deleteWebsite(wid) {

            return $http.delete("/api/website/" + wid);

        }

        function findAllWebsitesForUser(uID) {

            return $http.get("/api/user/" + uID + "/website");

        }

        function findWebsiteById(wid) {



            return $http.get("/api/website/" + wid);
        }

        function createWebsiteForUser(uid,newWebsite) {

            return $http.post("/api/user/" + uid + "/website",newWebsite);
        }


    }

})();
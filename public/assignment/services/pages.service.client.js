/**
 * Created by panktibhalani on 2/14/17.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService($http) {

        var pages =
            [
                {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
                {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
                {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
            ];

        var api = {
            "pages": pages,
            "createPage": createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;
        function updatePage(pageId, newPage) {

            return $http.put("/api/page/" + pageId,newPage);
        }

        function deletePage(pid) {

            return $http.delete("/api/page/"+pid);
        }


        function findAllPagesForWebsite(websiteID) {
           return $http.get("/api/website/"+ websiteID + "/page");
        }

        function findPageById(pid) {
            return $http.get("/api/page/" + pid);
        }

        function createPage(wid,newPage) {
            return $http.post("/api/website/" + wid + "/page",newPage);
        }
    }

})();
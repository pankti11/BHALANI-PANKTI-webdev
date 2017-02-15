/**
 * Created by panktibhalani on 2/14/17.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",pageService);

    function pageService() {

        var pages =
            [
                {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
                {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
                {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
            ];

        var api = {
            "pages": pages,
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;
        function updatePage(pageId, newPage) {
            for (var p in pages) {
                var page = pages[p];
                if (page._id === pageId) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                    pages[p].websiteId = newPage.websiteId;

                    return page;
                }
            }
            return null;
        }

        function deletePage(pid) {
            for (var p in pages) {
                var page = pages[p];
                if (page._id === pid) {
                    var index = pages.indexOf(page);
                    pages.splice(index, 1)

                    return pid;
                }
            }
            return null;


        }

        function findPageByWebsiteId(websiteID) {
            var pageslist = []
            for (var p in pages) {
                var page = pages[p];
                if (page.websiteId === websiteID) {
                    pageslist.push(page)
                }

            }
            return pageslist;
        }

        function findPageById(pid) {
            for (var p in pages) {
                var page = pages[p];
                if (page._id === pid) {
                    return angular.copy(page);
                }
            }
            return null;
        }

        function createPage(wid,newPage) {


            var today = new Date();
            var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();

            time = time.toString();

            try {
                var pageNew =
                {
                    _id: time,
                    websiteId: wid,
                    name: newPage.name,
                    description: newPage.description
                };

                pages.push(pageNew);

                return time;
            }
            catch(err)
            {
                return null;
            }

        }





    }

})();
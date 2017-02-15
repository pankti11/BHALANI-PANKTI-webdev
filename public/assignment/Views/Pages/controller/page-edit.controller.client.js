/**
 * Created by panktibhalani on 2/15/17.
 */

/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams,PageService) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid']

        vm.update = update;
        vm.delete = deletePage;
        init();

        function init() {
            var PagesList = PageService.findPageByWebsiteId(websiteId);
            vm.pagesList = PagesList;
            vm.user_id = userId;

            vm.websiteId = websiteId;
            var pageInfo = PageService.findPageById(pageId)
            vm.pageInfo = pageInfo ;

        };




         function update(newPage) {
            var page = PageService.updatePage(pageId, newPage);
            if(page == null) {
                vm.error = "unable to update user";

            }
            else {
                vm.message = "user successfully updated"

            }
        };

         function deletePage() {
            var page = PageService.deletePage(pageId);
            if(page == null) {

                alert("User was not deleted")
            } else {
                alert("User deleted successfully")
            }
        };


    }

})();


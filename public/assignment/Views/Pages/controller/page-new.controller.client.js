/**
 * Created by panktibhalani on 2/15/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams,PageService) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        vm.addNewPage = addNewPage;
        init();

        function init() {
            var pagesList = PageService.findPageByWebsiteId(websiteId);

            vm.pagesList = pagesList
            vm.user_id = userId
            vm.websiteId = websiteId


        }

        function addNewPage(newPage) {
            var page = PageService.createPage(websiteId,newPage);
            if(page == null) {
                vm.error = "unable to add Page";
            } else {
                vm.message = "page added successfully";
                var pagesList = PageService.findPageByWebsiteId(websiteId);
                vm.pagesList = pagesList
                vm.user_id = userId
                vm.websiteId = websiteId

            }
        }
    }
})();
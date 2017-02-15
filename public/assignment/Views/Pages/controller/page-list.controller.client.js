/**
 * Created by panktibhalani on 2/15/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams,PageService) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        init()

        function init() {
            var pagesList = PageService.findPageByWebsiteId(websiteId);

            vm.pagesList = pagesList
            vm.user_id = userId
            vm.websiteId = websiteId


        }

    }
})();
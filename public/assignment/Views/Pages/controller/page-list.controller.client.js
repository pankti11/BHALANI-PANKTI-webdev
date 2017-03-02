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
            var promise = PageService.findAllPagesForWebsite(websiteId)

            promise
                .success(renderPageList)
                .error(errorMessage);

        }

        function renderPageList(pagesList) {



            vm.pagesList = pagesList
            vm.user_id = userId
            vm.websiteId = websiteId

        }

        function errorMessage() {


        }

    }
})();
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

            PageService
                .findAllPagesForWebsite(websiteId)
                .success(renderPageList)
                .error(errorMessage);

        }

        function renderPageList(pagesList) {
            vm.pagesList = pagesList;
            vm.user_id = userId;
            vm.websiteId = websiteId;

        }

        function errorMessage() {

        }


        function addNewPage(newPage) {

            var promise = PageService.createPage(websiteId, newPage);
            promise
                .success(pageAdd)
                .error(pageAddError)

        }

        function pageAdd() {
            vm.message = "page added successfully";
            PageService
                .findAllPagesForWebsite(websiteId)
                .success(renderPageList)
                .error(errorMessage);
        }

        function pageAddError() {
            vm.error = "unable to add Page";
        }

    }
})();
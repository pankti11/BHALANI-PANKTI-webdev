/**
 * Created by panktibhalani on 2/14/17.
 */


(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams,WebsiteService) {

        var vm = this;
        var userId = $routeParams['uid'];
        vm.addNewWebsite = addNewWebsite
        init();

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(userId)

            promise
                .success(renderWebistesList)
                .error(errorMessage)

        }

        function renderWebistesList(webistesList) {
            vm.webistesList = webistesList;
            vm.user_id = userId
        }

        function errorMessage() {

        }


        function addNewWebsite(newWebiste) {

            var promise = WebsiteService.createWebsite(userId, newWebiste);
            promise
                .success(websiteAdd)
                .error(websiteAddError)


        }

        function websiteAdd() {

            vm.message = "website added successfully";
            var promise = WebsiteService.findAllWebsitesForUser(userId)

            promise
                .success(renderWebistesList)
                .error(errorMessage)
        }

        function websiteAddError() {
            vm.error = "unable to add webiste";
        }

    }
})();
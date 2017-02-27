/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams,WebsiteService) {

        var vm = this;
        var userId = $routeParams['uid'];

        init();

        function init() {

            WebsiteService
                .findAllWebsitesForUser(userId)
                .success(renderWebistesList)
                .error(errorMessage)

        }
        
        function renderWebistesList(webistesList) {
            vm.webistesList = webistesList;
            vm.user_id = userId
        }
        
        function errorMessage() {
            
        }



    }
})();
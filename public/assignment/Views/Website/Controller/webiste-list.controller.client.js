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
            var webistesList = WebsiteService.findWebsitesByUser(userId);

            vm.webistesList = webistesList
            vm.user_id = userId

        }



    }
})();
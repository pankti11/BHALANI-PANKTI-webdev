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
            var webistesList = WebsiteService.findWebsitesByUser(userId);

            vm.webistesList = webistesList;
            vm.user_id = userId;

        }



        function addNewWebsite(newWebiste) {
            var webiste = WebsiteService.createWebsite(userId,newWebiste);
            if(webiste == null) {
                vm.error = "unable to add webiste";
            } else {
                vm.message = "website added successfully";

                vm.website_ID = webiste;
                webistesList = WebsiteService.findWebsitesByUser(userId);
                vm.webistesList = webistesList;
                vm.user_id = userId;

            }
        }

    }
})();
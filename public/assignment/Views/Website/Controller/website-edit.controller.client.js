/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams,WebsiteService) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.update = update;
        vm.delete = deleteWebsite;
        init();


        function init() {
            var webistesList = WebsiteService.findWebsitesByUser(userId);
            vm.webistesList = webistesList;
            vm.user_id = userId;

            vm.wid = websiteId;
            var webInfo = WebsiteService.findWebsiteById(websiteId)
            vm.websiteInfo = webInfo ;
        }




         function update(newWebsite) {
            var user = WebsiteService.updateWebsite(websiteId, newWebsite);
            if(user == null) {
                vm.error = "unable to update user";
            }
            else {
                vm.message = "user successfully updated"

            }
        };

        function deleteWebsite() {
            var user = WebsiteService.deleteWebsite(websiteId);
            if(user == null) {
                alert("User was not deleted")
            } else {
                alert("User deleted successfully")
            }
        };


    }

})();

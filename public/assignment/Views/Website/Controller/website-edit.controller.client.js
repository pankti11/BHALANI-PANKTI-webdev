/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams,WebsiteService,$location) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.update = update;
        vm.delete = deleteWebsite;
        init();


        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(userId)

            promise
                .success(renderWebistesList)
                .error(errorMessage)


            var promise2 = WebsiteService.findWebsiteById(websiteId)

                promise2
                    .success(renderWebsiteEdit)
                    .error(errorMessage)

        }

        function renderWebsiteEdit(webInfo) {
            vm.websiteInfo = webInfo ;
        }

        function renderWebistesList(webistesList) {
            vm.webistesList = webistesList;
            vm.user_id = userId;
            vm.wid = websiteId;
        }

        function errorMessage() {

        }





         function update(newWebsite) {
             var promise = WebsiteService.updateWebsite(websiteId, newWebsite);

             promise
                 .success(updateWebsite)
                 .error(errorMessageUpdate)
         }

         function updateWebsite() {
             vm.message = "user successfully updated";

         }

        function errorMessageUpdate() {
            vm.error = "unable to update user";
        }

        function deleteWebsite() {

            var promise = WebsiteService.deleteWebsite(websiteId);

            promise
                .success(deletewebsite)
                .error(errorMessageDelete)

        }

        function deletewebsite() {
            alert("User deleted successfully");
            $location.url('/user/' + userId + '/website');
        }

        function errorMessageDelete() {
            alert("User was not deleted");
            $location.url('/user/' + userId + '/website');

        }



    }

})();

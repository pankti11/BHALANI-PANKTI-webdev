/**
 * Created by panktibhalani on 2/15/17.
 */

/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams,PageService,$location) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid']

        vm.update = update;
        vm.delete = deletePage;
        init();

        function init() {
            PageService
                .findAllPagesForWebsite(websiteId)
                .success(renderPageList)
                .error(errorMessage);


            PageService
                .findPageById(pageId)
                .success(getPage)
                .error(errorMessage);


        };

        function getPage(pageInfo) {
            vm.pageInfo = pageInfo ;

        }

        function renderPageList(pagesList) {
            vm.pagesList = pagesList;
            vm.user_id = userId;
            vm.websiteId = websiteId;

        }

        function errorMessage() {

        }

         function update(newPage) {
             var promise = PageService.updatePage(pageId, newPage);

             promise
                 .success(PageUpdated)
                 .error(PageUpdateError);

         }

         function PageUpdated () {

             vm.message = "user successfully updated"
         }

         function PageUpdateError() {
             vm.error = "unable to update user";
         }


         function deletePage() {
             var promise = PageService.deletePage(pageId);

             promise
                 .success(pageDeleted)
                 .error(PageDeleteError);
         }

         function pageDeleted() {
             alert("User deleted successfully")
             $location.url('/user/'+ userId + '/website/' + websiteId + '/page/' + pageId);
         }

         function PageDeleteError () {
             alert("User was not deleted")
             $location.url('/user/' + userId + '/website/' + websiteId + '/page/');

         }



    }

})();


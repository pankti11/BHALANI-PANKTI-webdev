/**
 * Created by panktibhalani on 2/15/17.
 */


(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($sce, $routeParams, WidgetService,$location) {
        var vm = this;

        vm.user_id = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        var userId =$routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        vm.addNewWidget = newWid;

        function newWid(chooser) {
            var newWidget;
            if (chooser === 1) {
                newWidget = "HEADER"
            }
            if (chooser === 2) {
                newWidget = "HTML"
            }
            if (chooser === 3) {
                newWidget = "IMAGE"
            }
            if (chooser === 4) {
                newWidget = "YOUTUBE"
            }

            var promise = WidgetService.createWidget(pageId, {'WidgetType' : newWidget});

            promise
                .success(addnewWidget)
                .error(errorInAddingNewWidget)
        }

        function addnewWidget(wig) {
            $location.url('/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + wig);

        }
        function errorInAddingNewWidget() {

        }

    }

})();

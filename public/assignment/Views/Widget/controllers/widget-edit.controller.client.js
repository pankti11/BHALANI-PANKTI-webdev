/**
 * Created by panktibhalani on 2/15/17.
 */

/**
 * Created by panktibhalani on 2/14/17.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams,WidgetService,$location) {

        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];

        vm.user_id = userId;
        vm.widgetID = widgetId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        vm.update = update;
        vm.delete = deleteWebsite;
        init();


        function init() {

            var promise = WidgetService.findWidgetById(widgetId);

                promise
                    .success(populateWidgetInfo)
                    .error(errorMessage)


        }


        function populateWidgetInfo(widgetInfo) {

            vm.widget = widgetInfo ;

        }
        
        function errorMessage() {
            
        }

        function update(newWidget) {


            var promise = WidgetService.updateWidget(widgetId, newWidget);

            promise
                .success(UpdateWidget)
                .error(errorOnUpdating)
        }

        function UpdateWidget() {

            vm.message = "Widget successfully updated";
        }

        function errorOnUpdating() {
            vm.error = "unable to update Widget";
        }

        function deleteWebsite() {
            var promise = WidgetService.deleteWidget(widgetId);

            promise
                .success(DeleteWebsite)
                .error(errorDeleteWebsite)
        }

        function DeleteWebsite() {
            alert("Widget was not deleted")
            $location.url('/user/'+ userId + '/website/' + websiteId + "/page/" + pageId + '/widget');
        }

        function errorDeleteWebsite() {
            alert("Widget deleted successfully")
            $location.url('/user/'+ userId + '/website/' + websiteId + "/page/" + pageId + '/widget');
        }
    }

})();


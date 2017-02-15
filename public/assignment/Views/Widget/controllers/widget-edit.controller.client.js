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

    function WidgetEditController($routeParams,WidgetService) {

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

            var widgetInfo = WidgetService.findWidgetById(widgetId)

            vm.widget = widgetInfo ;
        }




        function update(newWidget) {
            var widget_new = WidgetService.updateWidget(widgetId, newWidget);
            if(widget_new == null) {
                vm.error = "unable to update Widget";
            }
            else {
                vm.message = "Widget successfully updated"

            }
        };

        function deleteWebsite() {
            var widget_new = WidgetService.deleteWidget(widgetId);
            if(widget_new == null) {
                alert("Widget was not deleted")
            } else {
                alert("Widget deleted successfully")
            }
        };


    }

})();


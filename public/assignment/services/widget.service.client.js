/**
 * Created by panktibhalani on 2/15/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {



        var api = {

            "createWidget": createWidget,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "rearrangeWidgets":rearrangeWidgets,
            "deleteWidget": deleteWidget
        }

        return api;

        function rearrangeWidgets(start,end,widgetId,PageId) {
            console.log(start)
            console.log(end)
            return $http.put("/page/" + PageId + "/widget?initial=" + start + "&final=" + end);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);

        }
        
        function createWidget(pageNewId,newWidget) {
            return $http.post("/api/page/" + pageNewId + "/widget",newWidget);

        }


        function updateWidget(widgetId, newWidget) {
            return $http.put("/api/widget/"+widgetId,newWidget);

        }


        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
        }

        function findAllWidgetsForPage(pid) {
            return $http.get("/api/page/" + pid + "/widget");
        }
    }
})();
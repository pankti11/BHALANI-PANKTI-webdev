/**
 * Created by panktibhalani on 2/15/17.
 */


(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.checkSafeURLImage = checkSafeURLImage;
        vm.user_id = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.message = ""
        vm.error = ""

        init();

        function init() {

             var promise = WidgetService.findAllWidgetsForPage(vm.pageId);

                promise
                    .success(getAllWidgets)
                    .error(errorInGettingWidgets);

        }

        function getAllWidgets(widgetList) {

            console.log(widgetList);
            vm.widgets = widgetList;
        }
        
        function errorInGettingWidgets() {
            
        }

        function checkSafeURLImage(widgetUrl, isUploaded) {

            var url = widgetUrl;

            if(isUploaded != undefined){

                var parts = widgetUrl.split('/');
                var id = parts[parts.length - 1];
                url = "http://localhost:3000/uploads/"+ id;
            }

            return $sce.trustAsResourceUrl(url);
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'Views/Widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {

            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
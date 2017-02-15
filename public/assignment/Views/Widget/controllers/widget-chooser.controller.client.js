/**
 * Created by panktibhalani on 2/15/17.
 */


(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($sce, $routeParams, WidgetService) {
        var vm = this;

        vm.user_id = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;



        vm.addNewWidget = newWid;

        function newWid(chooser) {
            var newWidget;
            if (chooser === 1) {
                newWidget = "HEADER"
            }
            if (chooser == 2){
                newWidget = "HTML"
            }
            if (chooser == 3){
                newWidget = "IMAGE"
            }
            if (chooser == 4){
                newWidget = "YOUTUBE"
            }

                var wig = WidgetService.createWidget(vm.pageId,newWidget);
                if(wig == null) {



                } else {
                    vm.widgetID = wig;

                }



        }




    }

})();

/**
 * Created by panktibhalani on 2/28/17.
 */

(function () {

    angular
        .module("WebAppMaker")
        .directive("wbdvDirectives",wbdvDirectives);

    function wbdvDirectives(WidgetService, $location) {

        function linkFunc(scope, element)
        {
            element.sortable({
                axis:'y',
                start: startSort,
                stop:endSort
            });


            var startIndex;
            var endIndex;
            var selectedWidget;
            function startSort(event,ui) {

                startIndex = ui.item.index();

                selectedWidget = scope.model.widgets[startIndex]._id;

            }
            
            function endSort(event,ui) {

                endIndex = ui.item.index();

                var promise = WidgetService.rearrangeWidgets(startIndex,endIndex,selectedWidget,scope.model.pageId);

                promise
                    .success(afterRearrange)
                    .error(errorInRearranging)
            }
            
            function afterRearrange() {
                
            }
            
            function errorInRearranging() {
                
            }
        }
        return {
            link: linkFunc
        }
    }


})();

/**
 * Created by panktibhalani on 3/22/17.
 */

module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var schemaWidget = require('./widget.schema.server')();
    var widgetModel = mongoose.model('AssignmentPbhalaniWidget', schemaWidget);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        rearrangeWidgets:rearrangeWidgets,
        deleteWidget: deleteWidget
    };

    return api;



    function rearrangeWidgets(pageID,start,end) {

        var widgets;
        var deferred = q.defer();
        widgetModel
            .find({_page:pageID})
            .then(function (allWidgets) {
                allWidgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.current_index == start) {
                            widget.current_index = end;
                            widget.save();
                        }
                        else if (widget.current_index > start && widget.current_index <= end) {
                            widget.current_index = widget.current_index - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.current_index == start) {
                            widget.current_index = end;
                            widget.save();
                        }

                        else if (widget.current_index < start && widget.current_index >= end) {
                            widget.current_index = widget.current_index + 1;
                            widget.save();
                        }
                    }
                });
                deferred.resolve();


        },function () {
                deferred.abort()
            });
        return deferred.promise;
    }

    
    
    
    function deleteWidget(widgetId) {

        var deferred = q.defer();

        console.log("delete model")
        widgetModel.findById(widgetId,function (err,widget) {

            if(err)
            {
                deferred.abort()
            }
            else {
                console.log(widget)
                var pageId = widget._page;
                var order = widget.current_index;
                widgetModel.find({_page: pageId}, function (err, widgets) {
                    if(err)
                    {
                        deferred.abort()
                    }
                    else {
                        console.log(widgets)
                        widgets.forEach(function (widget1) {
                            if (widget1.current_index > order) {
                                widget1.current_index = widget1.current_index - 1;
                                widget1.save();
                            }
                        });
                        widgetModel.remove({_id: widgetId}, function (err, widget2) {
                            if (err) {
                                deferred.abort()
                            }
                            else {
                                console.log("deleted")
                                deferred.resolve()
                            }

                        });
                    }
                });

            }
        });
        return deferred.promise;
    }





    function updateWidget(widgetid,newWidget) {
        var deferred = q.defer();

        widgetModel
            .update({_id:widgetid},{$set:newWidget})
            .then(function (status) {
                deferred.resolve();
            },function () {
                deferred.abort();
            });
        return deferred.promise;
    }

    function createWidget(widget) {

        var deferred = q.defer();
        var max1=0;

        widgetModel
            .find({_page:widget._page})
            .then(function (allW) {


                widget.current_index = allW.length;
                widgetModel
                    .create(widget,function (err,widgetN) {
                        if(err)
                        {
                            deferred.abort()
                        }
                        else {

                            deferred.resolve(widgetN)
                        }
                    });

            },function () {
                deferred.abort()
            });
        return deferred.promise;
    }
    
    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();

        widgetModel
            .find({_page:pageId},function (err,widgets) {
                if(err)
                {
                    deferred.abort()
                }
                else {

                    deferred.resolve(widgets)
                }
            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel
            .findById(widgetId,function (err,widgets) {
                if(err)
                {


                    deferred.abort()
                }
                else {

                    deferred.resolve(widgets)
                }
            });
        return deferred.promise;


    }
}
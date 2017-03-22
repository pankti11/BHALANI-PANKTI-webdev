/**
 * Created by panktibhalani on 3/22/17.
 */


module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var schemaPage = require('./page.schema.server')();

    var pageModel = mongoose.model('AssignmentPbhalaniPage', schemaPage);


    var api = {

        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deleteWidgetInstance:deleteWidgetInstance,
        addWidgetInstance:addWidgetInstance
    }

    return api;

    function deleteWidgetInstance(pageId,widgetID) {

        var deffered = q.defer();

        pageModel
            .findById(pageId,function (err,pages) {
                if(err)
                {
                    console.log(err)
                    deffered.abort()
                }
                else {

                    var index = pages.widgets.indexOf(widgetID);
                    pages.widgets.splice(index, 1);
                    pages.save();
                    deffered.resolve();
                }
            });
        return deffered.promise;
    }

    function addWidgetInstance(pageId,widget) {

        var deffered = q.defer();

        pageModel
            .findById(pageId,function (err,page) {
                page.widgets.push(widget)
                page.save()
                deffered.resolve(page);
            });
        return deffered.promise;

    }
    
    
    function createPage(websiteId, page) {
        page._website = websiteId;
        var deffered = q.defer();

        pageModel
            .create(page,function (err,page) {
                if(err)
                {
                    deffered.abort()
                }
                else
                {
                    deffered.resolve(page)
                }

            });
    return deffered.promise;
    }
    
    function findAllPagesForWebsite(websiteId) {
        var deffered = q.defer();

        pageModel
            .find({_website:websiteId},function (err,pages) {
            if(err)
            {
                deffered.abort()
            }
            else {
                deffered.resolve(pages)
            }
            });

        return deffered.promise
    }

    function findPageById(pageId) {

        var deffered = q.defer();

        pageModel
            .findById(pageId,function (err,pages) {
                if(err)
                {
                    deffered.abort()
                }
                else {
                    console.log(pages)
                    deffered.resolve(pages)
                }
            });

        return deffered.promise

    }
    
    function updatePage(pageId,page) {
        var deffered = q.defer();

        pageModel
            .update({_id:pageId},{$set:page})
            .then(function (status) {
                deffered.resolve()
            },function (err) {
                deffered.abort()
            });

        return deffered.promise;
    }





    function deletePage(pageId) {

        var deffered = q.defer();

        pageModel
            .remove({_id:pageId})
            .then(function (status) {
                deffered.resolve()
            },function (err) {
                deffered.abort()
            });

        return deffered.promise;

    }
};


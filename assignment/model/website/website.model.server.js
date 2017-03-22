/**
 * Created by panktibhalani on 3/21/17.
 */
module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var schemaWebsite = require('./website.schema.server')();
    var websiteModel = mongoose.model('AssignmentPbhalaniWebsite', schemaWebsite);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        addPageInWebsite:addPageInWebsite,
        deleteWebsite: deleteWebsite,
        deletePageInstance:deletePageInstance
    };

    return api;

    function deletePageInstance(websiteId,pageId) {

        var deffered = q.defer();

        websiteModel
            .findById(websiteId,function (err,websites) {
                if(err)
                {
                    deffered.abort()
                }
                else {

                    var index = websites.pages.indexOf(pageId);
                    websites.pages.splice(index, 1);
                    websites.save();
                    deffered.resolve();
                }
            });
        return deffered.promise;
    }



    function createWebsiteForUser(userId,newPage) {

        newPage._user = userId

        console.log("createWebsite")
        var deffered = q.defer();
        console.log(userId)
        websiteModel
            .create(newPage, function (err, data) {
                if (err) {
                    deffered.abort();
                }
                else {
                    console.log(data)
                    deffered.resolve(data)
                }
            });
        return deffered.promise;
    }

    function findAllWebsitesForUser(userID) {

        var deffered = q.defer();

        websiteModel
            .find({_user:userID},function (err,websites) {
            if(err)
            {
                deffered.abort();
            }
            else
            {
                deffered.resolve(websites)
            }

            });
        return deffered.promise;
    }


    function findWebsiteById(websiteID) {
        var deffered = q.defer();
        console.log("f")
        console.log(websiteID)
        websiteModel
            .findById(websiteID,function (err,websites) {
                if(err)
                {
                    deffered.abort();
                }
                else
                {
                    console.log("got the site by id")
                   console.log(websites)
                    deffered.resolve(websites);
                }
            });
        return deffered.promise;
    }
    
    function updateWebsite(websiteId,updateWebsite) {
        var deffered = q.defer();
        
        websiteModel
            .update({_id:websiteId},{$set:updateWebsite})
            .then(function (status) {


                deffered.resolve()
            },function () {
                deffered.abort()
            });

        return deffered.promise;
    }

    function deleteWebsite(websiteId) {
        var deffered = q.defer();

        websiteModel.remove({_id:websiteId},function (err,status) {
            if(err)
            {
                deffered.abort();
            }
            else
            {
                deffered.resolve();
            }
        });
        return deffered.promise;
    }

    function addPageInWebsite(websiteID,page) {

        var deffered = q.defer();

        websiteModel
            .findById(websiteID,function (err,website) {

                website.pages.push(page)
                website.save()
                deffered.resolve(website);

            });

        return deffered.promise;

    }
}
/**
 * Created by panktibhalani on 3/21/17.
 */


module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var schemaUser = require('./user.schema.server')();

    var userModel = mongoose.model('AssignmentPbhalaniUser', schemaUser);

    var api = {
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        createUser: createUser,
        deleteUser : deleteUser,
        addWebsiteInUser:addWebsiteInUser,
        findUserByUsername : findUserByUsername,
        deleteWebsiteInstance:deleteWebsiteInstance
    };

    return api;


    function deleteWebsiteInstance(userId,websiteId) {

        var deffered = q.defer();

        userModel
            .findById(userId,function (err,users) {
                if(err)
                {

                    deffered.abort()
                }
                else {

                    var index = users.websites.indexOf(websiteId);
                    users.websites.splice(index, 1);
                    users.save();
                    deffered.resolve();
                }
            });
        return deffered.promise;
    }


    function addWebsiteInUser(userId,website) {
        var deffered = q.defer();

        userModel
            .findById(userId,function (err,user) {
                user.websites.push(website)
                user.save()
                deffered.resolve(user);
            });
            return deffered.promise;
    }

    function findUserByCredentials(username,password) {
        var deffered = q.defer();

        userModel
            .find({})
            .where('username').equals(username)
            .where('password').equals(password)
            .then(function (user) {
                console.log(user)
                deffered.resolve(user)
            },function (error) {
            deffered.abort()
        });
        return deffered.promise;
    }
    
    function findUserByUsername(username) {
        var deffered = q.defer();

        userModel
            .find({username:username})
            .then(function (user) {
                deffered.resolve(user)
            },function (error) {
            deffered.abort()
        });

        return deffered.promise;
    }


    function findUserById(userId) {
        var deferred = q.defer();

        userModel
            .findById(userId)
            .then(function (users) {
                deferred.resolve(users)
            },function (error) {
            deferred.abort()
        });
        return deferred.promise;
    }

    function updateUser(userID,updatedUser) {

        var deferred = q.defer();

        userModel
            .update({_id:userID},{$set:updatedUser})
            .then(function (status) {

                deferred.resolve()
                },
            function (error) {
            deferred.abort();
        });
        return deferred.promise;
    }
    
    function createUser(newUser) {
        var deferred = q.defer();

        console.log("createUser")

        userModel.create(newUser,function (err,doc) {
            if(err)
            {
                deferred.abort();
            }
            else
            {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        
    }
    
    function deleteUser(userID) {

        var deferred = q.defer();
        userModel.remove({_id:userID},function (err,status) {
            if(err)
            {
                deferred.abort();
            }
            else
            {
                deferred.resolve();
            }
        });
        return deferred.promise;
    }
};
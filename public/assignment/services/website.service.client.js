/**
 * Created by panktibhalani on 2/14/17.
 */

/**
 * Created by panktibhalani on 2/14/17.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",websiteService);

    function websiteService() {

        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]


        var api = {
            "websites": websites,
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        function updateWebsite(wId, newWebsite) {
            for (var w in websites) {
                var website = websites[w];
                if (website._id === wId) {
                    websites[w].name = newWebsite.name;
                    websites[w].description = newWebsite.description;
                    return website;
                }
            }
            return null;
        }

        function deleteWebsite(wid) {
            for(var w in websites) {
                var website = websites[w];
                if( website._id === wid ) {
                    var index = websites.indexOf(website);

                    websites.splice(index,1)

                    return wid;
                }
            }
            return null;


        }

        function findWebsitesByUser(uID) {
            list_of_websites = [];



            for (var w in websites) {
                var website = websites[w];
                if (website.developerId === uID) {
                    list_of_websites.push(website);

                }
            }

            return list_of_websites;

        }

        function findWebsiteById(wid) {
            for (var w in websites) {
                var website = websites[w];
                if (website._id === wid) {
                    return angular.copy(website);
                }
            }
            return null;
        }

        function createWebsite(uid,newWebsite) {


            var today = new Date();
            var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();
            time = time.toString();

            try {
                var websiteNew =
                    {
                        _id: time,
                        developerId: uid,
                        name: newWebsite.name,
                        description: newWebsite.description
                    };

                websites.push(websiteNew);

                return time;
            }
            catch(err)
            {
                return null;
            }

        }


    }

})();
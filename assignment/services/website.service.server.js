/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    var websites =
        [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


    function updateWebsite(req, res) {

        var wId = req.params['websiteId'];
        var newWebsite = req.body;

        for (var w in websites) {
            var website = websites[w];
            if (website._id === wId) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;

                res.sendStatus(200);
                return true;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req,res) {

        var wid = req.params['websiteId'];

        for(var w in websites) {
            var website = websites[w];
            if( website._id === wid ) {
                var index = websites.indexOf(website);

                websites.splice(index,1)
                res.sendStatus(200);


                return true;
            }
        }
        res.sendStatus(404);


    }

    function findAllWebsitesForUser(req,res) {
        list_of_websites = [];

        console.log("in get all websites")
        var uID = req.params['userId'];

        for (var w in websites) {
            var website = websites[w];
            if (website.developerId === uID) {
                list_of_websites.push(website);


            }
        }

        res.send(list_of_websites);
        return true;

    }

    function findWebsiteById(req,res) {

        var wid = req.params['websiteId'];


        for (var w in websites) {
            var website = websites[w];
            if (website._id === wid) {

                res.send(website);
                res.sendStatus(200);
                return true;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req,res) {

        var uid = req.params['userId'];
        var newWebsite = req.body;

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

            res.json(websiteNew);

            return true;
        }
        catch(err)
        {
            res.sendStatus(404);
        }

    }

}

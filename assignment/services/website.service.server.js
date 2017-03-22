/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app,model) {
    app.post("/api/user/:userId/website", createWebsiteForUser);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    var userModel = model.userModel;
    var websiteModel = model.websiteModel;


    function updateWebsite(req, res) {

        var wId = req.params['websiteId'];
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(wId,newWebsite)
            .then(function () {
                res.sendStatus(200);
                return true;
            },function () {
                res.sendStatus(404);
            });

    }


    function deleteWebsite(req,res) {
        var wid = req.params['websiteId'];

        websiteModel.findWebsiteById(wid)
            .then(function (website) {

                userModel
                    .deleteWebsiteInstance(website._user, wid)
                    .then(function () {
                        websiteModel
                            .deleteWebsite(wid)
                            .then(function () {
                                res.sendStatus(200);
                                return true;
                            }, function () {

                                res.sendStatus(400);
                            });
                    }, function () {

                        res.sendStatus(400);
                    });
            },function () {
                res.sendStatus(404);
            });
    }






    function findAllWebsitesForUser(req,res) {
        list_of_websites = [];


        var uID = req.params['userId'];

        websiteModel
            .findAllWebsitesForUser(uID)
            .then(function (list_of_websites) {
                res.send(list_of_websites);
                return true;
            },function () {
                res.sendStatus(404);
            });
    }

    function findWebsiteById(req,res) {

        var wid = req.params['websiteId'];
        websiteModel
            .findWebsiteById(wid)
            .then(function (website) {
                res.send(website);
                console.log(website)
                return true;
            },function () {
                console.log("error")
                res.sendStatus(404);
            });

    }

    function createWebsiteForUser(req,res) {

        var uid = req.params['userId'];
        var newWebsite = req.body;

        console.log(newWebsite)
        try {
            var websiteNew =
                {
                    name: newWebsite.name,
                    description: newWebsite.description
                };

            websiteModel
                .createWebsiteForUser(uid,newWebsite)
                .then(function (websiteNew) {
                    console.log(websiteNew)
                    userModel.addWebsiteInUser(uid,websiteNew)
                    res.json(newWebsite);
                    return true;
                },function () {
                    res.sendStatus(404);
                });
        }
        catch(err)
        {
            res.sendStatus(404);
        }

    }

}

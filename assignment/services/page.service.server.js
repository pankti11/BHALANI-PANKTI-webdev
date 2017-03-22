/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app,model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    var pageModel = model.pageModel;
    var websiteModel = model.websiteModel;



    function updatePage(req, res) {

        var pageId = req.params['pageId'];
        var newPage = req.body;

        pageModel
            .updatePage(pageId,newPage)
            .then(function () {
                res.sendStatus(200);
                return true;
            },function () {
                res.sendStatus(404);
            });
        }


    function deletePage(req,res) {
        var pid = req.params['pageId'];

        pageModel.findPageById(pid)
            .then(function (page) {

                websiteModel
                    .deletePageInstance(page._website, pid)
                    .then(function () {
                        pageModel
                            .deletePage(pid)
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


    function findAllPagesForWebsite(req,res) {

        var websiteID = req.params['websiteId']

        pageModel
            .findAllPagesForWebsite(websiteID)
            .then(function (pageslist) {
                res.send(pageslist);
                return true;
            },function () {
                res.sendStatus(404);
            })

    }

    function findPageById(req,res) {

        var pid = req.params['pageId'];

        pageModel
            .findPageById(pid)
            .then(function (page) {
                res.send(page);
                return true;
            },function () {
                res.sendStatus(404);
            });

    }

    function createPage(req,res) {

        var wid = req.params['websiteId'];
        var newPage = req.body;


        try {
            var pageNew =
                {
                    name: newPage.name,
                    description: newPage.description
                };

           pageModel
               .createPage(wid,newPage)
               .then(function (page) {
                   websiteModel
                       .addPageInWebsite(wid,page)
                       .then(function () {
                           res.send(page)
                           res.sendStatus(200);
                           return true;
                       });

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


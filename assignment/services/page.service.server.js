/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    var pages =
        [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];



    function updatePage(req, res) {

        var pageId = req.params['pageId'];
        var newPage = req.body;

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pageId) {
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                pages[p].websiteId = newPage.websiteId;

                res.sendStatus(200);
                return true;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req,res) {

        var pid = req.params['pageId'];

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pid) {
                var index = pages.indexOf(page);
                pages.splice(index, 1)


                res.sendStatus(200);
                return true;
            }
        }
        res.sendStatus(404);


    }

    function findAllPagesForWebsite(req,res) {

        var websiteID = req.params['websiteId']

        var pageslist = []
        for (var p in pages) {
            var page = pages[p];
            if (page.websiteId === websiteID) {
                pageslist.push(page)
            }

        }
        res.send(pageslist);
        return;
    }

    function findPageById(req,res) {

        var pid = req.params['pageId'];

        for (var p in pages) {
            var page = pages[p];
            if (page._id === pid) {
                 res.send(page);
                 return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req,res) {

        var wid = req.params['websiteId'];
        var newPage = req.body;

        var today = new Date();
        var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();

        time = time.toString();

        try {
            var pageNew =
                {
                    _id: time,
                    websiteId: wid,
                    name: newPage.name,
                    description: newPage.description
                };

            pages.push(pageNew);

            res.sendStatus(200);
            return true;
        }
        catch(err)
        {
            res.sendStatus(404);
        }

    }



}


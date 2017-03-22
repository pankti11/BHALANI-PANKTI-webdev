/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app,model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var path = require('path');

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    ///page/:pageId/widget?start=index1&end=index2

    app.put("/page/:pageId/widget", ReArrangeWidgets);
   // app.get("/api/widget/:start/:end/:widgetId/:PageId",ReArrangeWidgets);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var pageModel = model.pageModel;
    var widgetModel = model.widgetModel;


    function deleteWidget(req,res) {



        var widgetId = req.params['widgetId'];

                widgetModel.findWidgetById(widgetId)
                    .then(function (widget) {

                        pageModel
                            .deleteWidgetInstance(widget._page, widgetId)
                            .then(function () {

                                widgetModel
                                    .deleteWidget(widgetId)
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



    function createWidget(req,res) {

        var pageNewId = req.params['pageId'];
        var newWidgetType = req.body;
        var newWidget = newWidgetType.type;

        try {
            if (newWidget === "HEADER") {

                var widget_new = {

                    _page: pageNewId,
                    size: "",
                    text: "",

                    type: newWidget
                }
            }
            if (newWidget === "IMAGE") {

                var widget_new = {


                    _page: pageNewId,
                    width: "",
                    url:"",
                    type: newWidget
                }
            }
            if (newWidget === "HTML") {

                var widget_new = {


                    _page: pageNewId,
                    text: "",
                    type: newWidget
                }
            }
            if (newWidget === "YOUTUBE") {

                var widget_new = {


                    _page: pageNewId,
                    width: "",
                    url: "",
                    type: newWidget
                }
            }


            if (newWidget === "INPUT") {

                var widget_new = {


                    _page: pageNewId,
                    type: newWidget
                }
            }
            widgetModel
                .createWidget(widget_new)
                .then(function (widget_new1) {

                    pageModel
                        .addWidgetInstance(pageNewId,widget_new1)
                        .then(function () {
                            res.send(widget_new1)
                            res.sendStatus(200);
                            return true;
                        });
                },function () {

                    res.sendStatus(404);
                });
        }
        catch (err){
            res.sendStatus(404);
        }
    }

    function uploadImage(req, res) {

        var pageId        = req.body.pageId;

        var widgetId      = req.body.widgetId;

        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;

        if(myFile)
        {
            var destination   = myFile.destination; // folder where file is saved to
            var NewWidget =
            {
                width: "100%",
                url: req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename
            }

            widgetModel
                .updateWidget(widgetId,NewWidget)
                .then(function () {

                    res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");

                },function () {
                    console.log("error")
                })


            }
    }




    function ReArrangeWidgets(req,res) {
       // var start = req.params['start'];
       // var end = req.params['end'];



        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        var pageID = req.params['pageId'];

        console.log("In web service")

        widgetModel
            .rearrangeWidgets(pageID,start,end)
            .then(function () {
                res.send(200);
                return true;
            },function () {
                res.send(404);
            })
        }

    function updateWidget(req,res) {

        var widgetId = req.params['widgetId'];
        var newWidget = req.body;

        widgetModel
            .updateWidget(widgetId,newWidget)
            .then(function () {
                res.sendStatus(200);
                return true;
            },function () {
                res.sendStatus(404);
            });
    }


    function findWidgetById(req,res) {
        var widgetId = req.params['widgetId'];

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
                return true;
            },function () {
                res.sendStatus(404);
            });
    }



    function findAllWidgetsForPage(req,res) {
        var pid = req.params['pageId'];

        widgetModel
            .findAllWidgetsForPage(pid)
            .then(function (widgetList) {

                res.send(widgetList);
                return true;
            },function () {
                res.send(404);
            });
    }

}
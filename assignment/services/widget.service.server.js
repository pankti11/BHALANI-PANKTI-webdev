/**
 * Created by panktibhalani on 2/26/17.
 */

module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var path = require('path');

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.get("/api/widget/:start/:end/:widgetId/:PageId",ReArrangeWidgets);
    app.post("/api/upload", upload.single('myFile'), uploadImage);



    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO","current_index":1},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","current_index":2},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg","current_index":3},

        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>',"current_index":4},

        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum","current_index":5},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E","current_index":6 },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>","current_index":7}
    ];

    function deleteWidget(req,res) {

        var widgetId = req.params['widgetId'];
        var curr_index;
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
                var index = widgets.indexOf(widget);

                curr_index = widget.current_index;
                widgets.splice(index,1)
                res.sendStatus(200);

            }
        }
        console.log(widgets)

        for(var w in widgets)
        {
            if(widgets[w].current_index > curr_index)
            {
                widgets[w].current_index = widgets[w].current_index -1;
            }
        }

        console.log(widgets)
        return true;
        res.sendStatus(404);


    }

    function createWidget(req,res) {

        var pageNewId = req.params['pageId'];
        var newWidgetType = req.body;
        var newWidget = newWidgetType.WidgetType;

        var today = new Date();
        var time = today.getDate() + today.getFullYear() + today.getMonth() + today.getHours() + today.getMinutes() + today.getSeconds();
        time = time.toString();

        var len = widgets.length;

        try {
            if (newWidget === "HEADER") {

                var widget_new = {
                    _id: time,
                    pageId: pageNewId,
                    size: "",
                    text: "",
                    current_index:len,
                    widgetType: newWidget
                }
            }
            if (newWidget === "IMAGE") {

                var widget_new = {
                    _id: time,
                    current_index:len,
                    pageId: pageNewId,
                    width: "",
                    url:"",
                    widgetType: newWidget
                }
            }
            if (newWidget === "HTML") {

                var widget_new = {
                    _id: time,
                    current_index:len,
                    pageId: pageNewId,
                    text: "",
                    widgetType: newWidget
                }
            }
            if (newWidget === "YOUTUBE") {

                var widget_new = {
                    _id: time,
                    current_index:len,
                    pageId: pageNewId,
                    width: "",
                    url: "",
                    widgetType: newWidget
                }
            }

            widgets.push(widget_new);
            res.send(time);
            return true;
        }
        catch (err){

            res.sendStatus(404);
        }

    }

    function uploadImage(req, res) {

        // var widgetId      = req.body.widgetId;
        // var width         = req.body.width;
        // var myFile        = req.file;
        //
        // var originalname  = myFile.originalname; // file name on user's computer
        // var filename      = myFile.filename;     // new file name in upload folder
        // var path          = myFile.path;         // full path of uploaded file
        // var destination   = myFile.destination;  // folder where file is saved to
        // var size          = myFile.size;
        // var mimetype      = myFile.mimetype;





        var pageId        = req.body.pageId;
        // console.log(pageId);
        var widgetId      = req.body.widgetId;
        var width         = "100%";
        //console.log("wif"+width);
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        if(myFile)
        {
            var destination   = myFile.destination; // folder where file is saved to

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                    pageId = widgets[i].pageId;
                }
            }}





        // console.log("cgvhbjkl")
        // console.log(widgetId);
        // var widget = findWidgetByIdHelper(widgetId);
        // console.log(widget);
        // widget.url = "localhost:3000/uploads/" + filename;
        // widget.isUploaded = true;
        // console.log(req.body)
        res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");

    }
    


    function ReArrangeWidgets(req,res) {


        var start = req.params['start'];
        var end = req.params['end'];




        if(start != end) {
            var pageID = req.params['PageId'];

            var widgetID = req.params['widgetId']
            var count = 0


            var widgetStartID;
            var widgetEndID;
            for (var w in widgets) {

                if (widgets[w].pageId === pageID) {

                    if (count == start) {


                        widgetStartID = widgets[w].current_index;

                    }
                    if (count == end) {

                        widgetEndID = widgets[w].current_index;

                    }

                    count += 1;
                }
            }


            var newWidgets = [];
            var new_index = '0';
            var temp;
            var temp_index;


            if(start<end) {
                for (var w in widgets) {

                    if (widgets[w].current_index > widgetStartID && widgets[w].current_index < widgetEndID) {

                        widgets[w].current_index = widgets[w].current_index - 1
                        newWidgets.push(widgets[w]);
                    }
                    else if (widgets[w].current_index == widgetStartID) {


                        temp = widgets[w]

                    }
                    else if (widgets[w].current_index == widgetEndID) {

                        temp_index = widgets[w].current_index;
                        widgets[w].current_index = widgets[w].current_index - 1
                        newWidgets.push(widgets[w])
                        temp.current_index = temp_index;
                        newWidgets.push(temp);


                    }
                    else {
                        newWidgets.push(widgets[w]);


                    }

                }


            }
            else {
                var current_index = 1
                var temp_widget;
                for(var w in widgets)
                {
                    if(current_index === widgetStartID)
                    {
                        temp_widget = widgets[w];
                    }
                    current_index = current_index + 1
                }
                var current_index = 1


                for(var w in widgets)
                {

                    if(current_index === widgetEndID)
                    {
                        temp_widget.current_index = widgets[w].current_index;
                        newWidgets.push(temp_widget);
                        widgets[w].current_index = current_index + 1
                        newWidgets.push(widgets[w]);
                        current_index = current_index + 1;

                    }
                    else if(current_index === widgetStartID)
                    {
                        current_index = current_index + 1
                    }
                    else if(current_index > widgetEndID && current_index < widgetStartID)
                    {
                        widgets[w].current_index = current_index;
                        newWidgets.push(widgets[w])
                        current_index = current_index + 1

                    }
                    else
                    {
                        newWidgets.push(widgets[w])

                        current_index = current_index + 1
                    }



                }
                var current_index = 1

                for(var w in newWidgets)
                {
                    if(current_index <= widgetStartID && current_index >= (widgetEndID+2))
                    {
                        newWidgets[w].current_index = newWidgets[w].current_index + 1;
                    }
                    current_index = current_index + 1

                }


            }




            widgets = newWidgets;

            }


        }


    function updateWidget(req,res) {

        var widgetId = req.params['widgetId'];
        var newWidget = req.body;

        for (var w in widgets) {

            if (widgets[w]._id === widgetId) {
                if(widgets[w].widgetType === "HEADER"){
                    widgets[w].size = newWidget.size;
                    widgets[w].text = newWidget.text;
                }
                if(widgets[w].widgetType === "IMAGE"){
                    widgets[w].width = newWidget.width;
                    widgets[w].url = newWidget.url;
                }
                if(widgets[w].widgetType === "HTML"){
                    widgets[w].text = newWidget.text;

                }
                if(widgets[w].widgetType === "YOUTUBE"){
                    widgets[w].width = newWidget.width;
                    widgets[w].url = newWidget.url;
                }

                res.send(widgets[w]);


                return true;
            }
        }
        res.sendStatus(404);
    }


    function findWidgetById(req,res) {




        var widgetId = req.params['widgetId'];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {

                res.json(widgets[w]);
                return true;
            }
        }
        res.sendStatus(404);
    }

    function findWidgetByIdHelper(widgetId) {

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {


                return widgets[w];
            }
        }


    }

    function findAllWidgetsForPage(req,res) {


        var pid = req.params['pageId'];
        widgetList = []
        for(var w in widgets) {
            if(widgets[w].pageId === pid) {
                widgetList.push(widgets[w])
            }
        }


        res.send(widgetList);
        return true;
    }

}
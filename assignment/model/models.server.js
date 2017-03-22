/**
 * Created by panktibhalani on 3/21/17.
 */

module.exports = function (app) {
    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel  = require('./page/page.model.server')();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel : userModel,
        websiteModel : websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    }

    require('../../assignment/services/user.service.server')(app, model);
    require('../../assignment/services/website.service.server')(app,model);
    require('../../assignment/services/page.service.server')(app,model);
    require('../../assignment/services/widget.service.server')(app,model);

};
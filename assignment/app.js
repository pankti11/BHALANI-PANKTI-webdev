/**
 * Created by panktibhalani on 2/17/17.
 */

module.exports = function (app) {
    console.log("in server")
    require('./services/user.service.server')(app);
    require('./services/website.service.server')(app);
    require('./services/page.service.server')(app);
    require('./services/widget.service.server')(app);


    // TODO: create the services for the other entities: website, page, widget
};
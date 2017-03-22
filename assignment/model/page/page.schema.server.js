/**
 * Created by panktibhalani on 3/22/17.
 */


module.exports = function () {

    var mongoose = require('mongoose');

    var pageSchema = mongoose.Schema({
        _website : {type:mongoose.Schema.Types.ObjectId,ref:'AssignmentPbhalaniWebsite'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentPbhalaniWidget'}],
        dateCreated:{type: Date, default: Date.now}
    }, {collection: 'assignment.pbhalani.page'});



    return pageSchema;
}
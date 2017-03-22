/**
 * Created by panktibhalani on 3/21/17.
 */



module.exports = function () {

    var mongoose = require('mongoose');

    var websiteSchema = mongoose.Schema({
        _user:{type:mongoose.Schema.Types.ObjectId,ref:'AssignmentPbhalaniUser'},
        name:String,
        description:String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentPbhalaniPage'}],
        dateCreated:{type: Date, default: Date.now}
    }, {collection: 'assignment.pbhalani.website'});

    return websiteSchema;
}

/**
 * Created by panktibhalani on 3/21/17.
 */


module.exports = function () {

    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName:String,
        email:String,
        phone:String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentPbhalaniWebsite'}],
        dateCreated:{type: Date, default: Date.now}
    }, {collection: 'assignment.pbhalani.user'});



    return userSchema;
}

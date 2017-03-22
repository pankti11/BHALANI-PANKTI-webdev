/**
 * Created by panktibhalani on 3/22/17.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    console.log("create widget schema")

    var widgetSchema = mongoose.Schema({
        _page:{type:mongoose.Schema.Types.ObjectId,ref:'AssignmentPbhalaniPage'},
        name:String,
        text:String,
        placeholder:String,
        url:String,
        width:String,
        height:String,
        current_index:Number,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        type:{type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        description:String,
        dateCreated:{type: Date, default: Date.now}
    }, {collection: 'assignment.pbhalani.widget'});

    return widgetSchema;
}

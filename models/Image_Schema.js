const schema_mongoose = require('mongoose');

const ImageSchema = schema_mongoose.Schema(
    {
        title:{type:String},
        category:{type:String},
        image_path:{type:String},
        username : {type:String},
        email : {type:String},
        uid : {type:String},
       
        
    },
    {
        timestamps: true
    }
);
module.exports = schema_mongoose.model('images', ImageSchema);
const schema_mongoose = require('mongoose');

const UserSchema = schema_mongoose.Schema(
    {
        username : {type:String},
        email : {type:String},
        password : {type:String},
       
        
    },
    {
        timestamps: true
    }
);
module.exports = schema_mongoose.model('users', UserSchema);
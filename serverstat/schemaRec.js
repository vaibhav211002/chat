const mongoose = require('mongoose');


// mongodb://localhost:27017/userRecord
mongoose.connect("mongodb+srv://vaibhavbhatt-chat-app:4Po3vp34h1oSqUUD@cluster0.ua7fuon.mongodb.net/")
//mongodb+srv://vaibhavbhatt-chat-app:4Po3vp34h1oSqUUD@cluster0.ua7fuon.mongodb.net/

const userRecord = new mongoose.Schema({
    username : {
        type : String ,
    },
    id : {
        type: String ,
        required : true , 
        unique : true ,
    }
})


module.exports = mongoose.model('userRec',userRecord);
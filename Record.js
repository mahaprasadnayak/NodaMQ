const mongoose = require("mongoose");
// Creating Schema
const RecordSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
     email:{
         type:String,
         require:true
     }
    
});

const Record = new mongoose.model('Record', RecordSchema);
module.exports = Record;
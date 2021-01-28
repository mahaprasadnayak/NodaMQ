const mongoose = require("mongoose");
//Connection with mongodb database
mongoose.connect("mongodb://localhost:27017/setRecord",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(" connected to database");
}).catch( err  => {
    console.log("database not connected")
})


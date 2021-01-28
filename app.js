const express = require("express");
const app = express();
require("./conn");
const Record = require("./Record");
var amqp=require('amqplib/callback_api');
var amqpURL="amqp://localhost"

//set up middleware using express
//express.json() is used to handle upcoming json Object
app.use(express.json());

app.post("/setRecord",async(req,res) => {
    const user = new Record(req.body);
    user.save().then(()=>{
        res.json({id:user.id,userData:user});
        let x=user.id;
        
        //Connect to Rabbitmq
        amqp.connect(amqpURL,function(err,conn){
            conn.createChannel(function(err,ch){
                var queue='getsetrecords';
                var userid=x;
                ch.assertQueue(queue,{double:false});
                ch.sendToQueue(queue, Buffer.from(userid));
                setTimeout(()=>{
                    conn.close();
                },1000);
            });
        });
        
    }).catch((error) =>{
        res.send(error)
    })


})

app.get('/getRecord/:id',async(req,res)=>{
    Record.findById(req.params.id)
    .then(result=>{
        res.json({
            Record:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500)
    })
})
//Initialization of Server
app.listen(9000, () => console.log("Server is Up and Running at port 9000"));
const amqp =require('amqplib/callback_api');
var amqpURL="amqp://localhost"


// Connect to Rabbitmq and get the Auto_generated ID
amqp.connect(amqpURL,function(err,conn){
    conn.createChannel(function(err,ch){
                var queue='getsetrecords';
        ch.assertQueue(queue,{double:false});
        console.log("Waiting for messages",queue);
        ch.consume(queue,function(userid){
            console.log(userid.content.toString());
        });
    });
});







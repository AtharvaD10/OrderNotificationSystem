const stompjs = require('stompjs');

const host = 'localhost';
const port = 61613;
const user = 'admin';
const pass = 'admin';

const client = stompjs.overTCP(host,port);

client.connect(user,pass,(mesg)=>{
    console.log("Notification service connected" +mesg);

    client.subscribe('/queue/orders',(message)=>{
        const order = JSON.parse(message.body);
        console.log("Receive order:",order);

        console.log(`Notification: Order ${order.id} for ${order.quantity} ${order.item}(s) has been received.`);    
    });
},(error)=>{
    console.error("connection error"+error);  
})
const Stomp = require('stompjs');

const host = 'localhost';
const port = 61613; // Default STOMP port
const user = 'admin'; // Default user
const pass = 'admin'; // Default password

const client = Stomp.overTCP(host, port);

client.connect(user, pass, (frame) => {
    console.log('Notification Service Connected: ' + frame);

    // Subscribe to the orders queue
    client.subscribe('/queue/orders', (message) => {
        const order = JSON.parse(message.body);
        console.log('Received order:', order);
        
        // Simulate sending a notification
        console.log(`Notification: Order ${order.id} for ${order.quantity} ${order.item}(s) has been received.`);
    });

}, (error) => {
    console.error('Connection error: ' + error);
});

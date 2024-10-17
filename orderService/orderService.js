const Stomp = require('stompjs');

const host = 'localhost';
const port = 61613; // Default STOMP port
const user = 'admin'; // Default user
const pass = 'admin'; // Default password

const client = Stomp.overTCP(host, port);

client.connect(user, pass, (frame) => {
    console.log('Order Service Connected: ' + frame);

    // Simulate sending an order every 5 seconds
    setInterval(() => {
        const order = {
            id: Date.now(),
            item: 'Widget',
            quantity: Math.floor(Math.random() * 10) + 1,
        };

        console.log('Sending order:', order);
        client.send('/queue/orders', {}, JSON.stringify(order));
    }, 5000);

}, (error) => {
    console.error('Connection error: ' + error);
});

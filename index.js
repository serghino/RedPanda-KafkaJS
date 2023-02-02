import { Producer } from "./kafka/producer.js";
import { Consumer } from "./kafka/consumer.js";

// init producer
const producer = await Producer.connect();

// send messages
setInterval(async() => {
    await producer.send({
        topic: 'messages',
        messages: [
            { value: `Hello From Event Emitter ${Date.now()}` },   
        ],
    });
}, 3_000);

// init consumer
const consumer = await Consumer.connect({ groupId: 'cg2' });
await consumer.subscribe({ topics: ['messages', 'signups'], fromBeginning: false });
await consumer.run();   

// listen to topics
consumer.on('messages', (message) => {
    // TODO: save to db.
    console.log(message.value.toString());
});
consumer.on('signups', (message) => {
    console.log(message.value.toString());
});

// Error handling
consumer.on('error', (error) => {
    console.log(error);
});

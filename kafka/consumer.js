import { EventEmitter } from "node:events";
import { kafka } from "./kafka.js";

export class Consumer extends EventEmitter{
    #consumer;
    constructor(consumer){
        super();
        this.#consumer = consumer;
    }

    static async connect({groupId}){
        const consumer = kafka.consumer({ groupId });
        await consumer.connect();
        return new Consumer(consumer);
    }

    async subscribe({topics, fromBeginning}){
        await this.#consumer.subscribe({ topics, fromBeginning });
    }

    async run(){
        try {
            await this.#consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    this.emit(topic, message);
                },
            });
        } catch (error) {
            this.emit('error', error);
        }
        
    }

    async disconnect(){
        await this.#consumer.disconnect();
    }
}

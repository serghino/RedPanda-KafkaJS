import { kafka } from "./kafka.js";

export class Producer{
    #producer;
    constructor(producer){
        this.#producer = producer;
    }

    static async connect(){
        const producer = kafka.producer();
        await producer.connect();
        return new Producer(producer);
    }

    async send({topic, messages}){
        await this.#producer.send({
            topic,
            messages,
        });
    }

    async disconnect(){
        await this.#producer.disconnect();
    }
}
import {Kafka} from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

export const kafka = new Kafka({
    clientId: 'mntd',
    brokers: process.env.KAFKA_BROKERS.split(','),
});


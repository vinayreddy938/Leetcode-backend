import { createClient } from 'redis';
import { REDIS_SECRET } from './server.config.js';

const redisClient = createClient({
    username: 'default',
    password: REDIS_SECRET,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
export default redisClient;




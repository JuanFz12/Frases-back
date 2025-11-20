
import 'dotenv/config'
import * as joi from 'joi'
type NodeEnv = 'development' | 'production' | 'test';
interface EnvVars {
    PORT: number;
    JWT_SECRET: string;
    DATABASE_URL: string;
    NODE_ENV: NodeEnv;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    jwtSecret: envVars.JWT_SECRET,
    nodeEnv: envVars.NODE_ENV,
}
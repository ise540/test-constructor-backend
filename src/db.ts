import  { SequelizeOptions, Sequelize } from "sequelize-typescript";
import { Answer } from "./models/Answer";
import { CompletedTest } from "./models/CompletedTest";
import { Question } from "./models/Question";
import { Test } from "./models/Test";
import { User } from "./models/User";
import { UserAnswer } from "./models/UserAnswer";
import { UserToken } from "./models/UserToken";

export type DBconfig = {
  host: string;
  user: string;
  password: string;
  port?: number;
  name: string;
  type?: string;
};

export async function connect(configDB: DBconfig) {
  const config:SequelizeOptions = {
    username: configDB.user,
    password: configDB.password,
    database: configDB.name,
    host: configDB.host,
    port: configDB.port,
    dialect: 'postgres'
  }
  
  const connect = new Sequelize(config)
  connect.addModels([Answer, CompletedTest, Question, Test, User, UserAnswer, UserToken])
  await connect.sync()
  
  return connect;
} 
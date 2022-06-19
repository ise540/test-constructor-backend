import express from 'express';
import { connect }from './db';
import { config } from './configs/db';
import "dotenv/config";
import cors from 'cors';
import router from './routes'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use('/api', router)



async function startServer() {
  try {
    await connect(config);
    
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startServer();

import express from 'express';
import { connect }from './db';
import { config } from './configs/db';
import "dotenv/config";
import cors from 'cors';
import router from './routes'
import cookieParser from 'cookie-parser'
import error from './middlewares/error';

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use('/api', router)
app.use(error)



async function startServer() {
  try {
    await connect(config);
    
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startServer();

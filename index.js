import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import videoRoutes from './routes/videos.js';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const {PORT, CORS_ORIGIN} = process.env;
app.use(cors({origin: CORS_ORIGIN}));
app.use('/images', express.static("public/images"));

app.use("/videos",videoRoutes);
app.listen(PORT || 8080, (_req, _res)=> {
  console.log(`The Server is listening on port ${PORT}`);
});


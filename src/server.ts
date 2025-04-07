import connectDB from "./config/db.config";
import express, { Request, Response } from "express";
import cors from "cors";
import logger from "./utils/logger";
import appointmentRoutes from "./routes/appointment.routes";


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hiii" });
});

appointmentRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
  logger.info("Database Connected!");
});

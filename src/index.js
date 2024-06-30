import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import errorMiddleware from "./middlewares/errorMiddlewares.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const port = process.env.PORT || 3000;

// ----------------------------------------

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

// use routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
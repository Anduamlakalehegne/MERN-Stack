import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/dbConnection.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoute } from "./routes/auth.route.js";
import { blogRoute } from "./routes/blog.route.js";

dbConnection();

const app = express();
const port = process.env.SERVER_PORT || 5001;

const corsOrigin = {
  origin: "http://localhost:5173", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOrigin));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application starts on port ${port}`);
});

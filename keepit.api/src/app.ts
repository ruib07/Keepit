import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { routes } from "./routes/index.js";

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  }),
);

routes(app);
errorHandler(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, stack } = err;
  if (name === "validationError") res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

export default app;

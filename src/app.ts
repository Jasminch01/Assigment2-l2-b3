import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/module/products/product.routes";

const app = express();

//parser
app.use(express.json());

app.use(cors());

app.use("/api/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success : true,
    message : "welcome!! The server is online",
  });
});
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
  next()
});

export default app;

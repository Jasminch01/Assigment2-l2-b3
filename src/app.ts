import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/module/products/product.routes";

const app = express();

//parser
app.use(express.json());

app.use(cors());

app.use("/api/", router);
app.use((req, res,) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

export default app;

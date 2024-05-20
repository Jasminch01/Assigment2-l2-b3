import express, { Request, Response } from "express";
import cors from "cors"
import router from "./app/module/products/product.routes";

const app = express();

//parser

app.use(cors());

app.use('/api/product', router)

app.get('/', (req : Request, res : Response) => {
    res.send("Hello from server")
})

export default app;




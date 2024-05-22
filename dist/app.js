"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = __importDefault(require("./app/module/products/product.routes"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/", product_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome!! The server is online",
    });
});
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route not found" });
    next();
});
exports.default = app;

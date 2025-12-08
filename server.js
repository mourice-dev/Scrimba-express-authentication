/** @format */

import express from "express";
import session from "express-session";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "your-secret-key", // In production, use a secure environment variable
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });

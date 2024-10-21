import express from "express";
import bodyParser from "body-parser";

import morgan from "morgan";
import cors from "cors";
import "./config/dbConnection.js";
import db from "./config/dbConnection.js";
import userRouter from "./routes/user-router.js";
import certificateRouter from "./routes/certificate-routes.js";
import { validateCertificate } from "./helpers/validation.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// global error handler
app.use((err, req, res, next) => {
	console.log(err);
	err.statusCode = err.statusCode ?? 500;
	err.message = err.message ?? "Something went wrong";
	res.status(err.statusCode).json({
		message: err.message,
	});
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/certificates", certificateRouter);

// app.get("/test", (req, res) => {
// 	res.status(200).send("Hello World from the server!");
// });

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

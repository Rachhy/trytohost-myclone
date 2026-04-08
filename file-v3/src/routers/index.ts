import express from "express";
import fileRouter from "../controllers/routing";

const routers = express.Router();

// File Route
routers.use('/file',       fileRouter);

export default routers;
//All imports
import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/errorMiddleWare";
import cookieParser from "cookie-parser"
import cors from "cors";
import UrlRouter from "./router/urlRoutes"


//  env file import 

dotenv.config({
    path: "./config/config.env",
  });


const app = express();


 //**********************************Cross Origin*********************************/

 app.use(cors({
    credentials: true,
    origin:["http://localhost:3000","https://url-shortner-frontend-9fa2-30u8cqm50-noobcodery.vercel.app","https://url-shortner-frontend-9fa2.vercel.app/","*"],
  }))
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }))
  
app.use(cookieParser())
  


  //**********************************REST API Routes**********************************/

app.use("/api/v1",UrlRouter)

 //**********************************error middleware**********************************/

  app.use(error)



export default app

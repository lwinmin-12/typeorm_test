import express, { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "./Entities/User.entities";

const app = express();
app.use(express.json());

const server = require("http").createServer(app);

//require data

createConnection({
  type: "mysql",
  database: "typeOrmTest",
  username: "lwinmin",
  password: "Asdffdsa-4580",
  logging: true,
  synchronize: true,
  entities: [User],
});

app.get("/api", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.get("/api/users", async (req, res) => {
  let data = await User.find();
  res.json(data);
});

app.post("/api/users", async (req, res) => {
  let data = await User.insert({
    firstName: "Moh Moh",
    lastName: "Aung Myint",
    username: "Moh-11",
    password: "chit-tal",
  });

  res.end()
});

//Error Routes
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

server.listen(3001, () =>
  console.log(`server is running in  http://localhost:3001`)
);

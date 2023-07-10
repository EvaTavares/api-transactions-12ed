import cors from "cors";
import express, { Request, Response } from "express";
import { appRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";

import pool from "./database/database.config";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", appRoutes());

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT + "!");
});

pool
  .connect()
  .then((connection) => {
    console.log(connection);
    console.log("conexão realiza dom sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

// type User = {
//     nome: string;
// };

// type UserPhone = {
//     phone: number;
// };

// type UserAddress = {
//     address: string;
// };

// type CompleteUser = User & UserPhone;
// type UserInfo = UserAddress | UserPhone;

// const user: CompleteUser = {
//     nome: "abc",
//     phone: 123,
// };

// const userInfoPhone: UserInfo = {
//     phone: 123,
// };

// const userInfoAddress: UserInfo = {
//     address: "abc",
// };

// interface IUser {
//     name: string;
// }
// interface IUserPhone {
//     phone: string;
// }
// interface ICompleteUser extends IUser {
//     phone: string;
// }
// interface ICompleteUserImpl extends IUser, IUserPhone {}

// const iUser: ICompleteUserImpl = {

// }

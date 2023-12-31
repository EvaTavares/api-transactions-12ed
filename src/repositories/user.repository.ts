import { usersList } from "../data/users";
import { Database } from "../database/database.connection";
import { User } from "../models/user.model";

export class UserRepository {
  private connection = Database.connection;

  public async list() {
    const result = await this.connection.query(
      "select * from transactions.users"
    );
    console.log(result);
    return result.rows;
  }

  public async create(newUser: any) {
    const user = new User(
      newUser.name,
      newUser.cpf,
      newUser.email,
      newUser.age,
      newUser.password
    );
    const result = await this.connection.query(
      `insert into transactions.users( id, name, password, cpf, email, age)
      values
      ('${user.id}', '${user.name}', '${user.password}', '${user.cpf}', '${user.email}', ${user.age})
      `
    );
    return result.rows;
  }

  public async get(id: string) {
    //   return usersList.find((user) => user.id === id);
    const result = await this.connection.query(
      `select * from transactions.user where id = '${id}'`
    );

    if (result.rows.length == 0) {
      return undefined;
    }
    const dbUser = result.rows[0];
    return UserRepository.mapRowToModel(dbUser);
  }

  public getByCpf(cpf: number) {
    return usersList.find((user) => user.cpf === cpf);
  }

  public getByEmail(email: string) {
    return usersList.find((user) => user.email === email);
  }

  public static mapRowToModel(row: any): User {
    return User.create(row);
  }
}

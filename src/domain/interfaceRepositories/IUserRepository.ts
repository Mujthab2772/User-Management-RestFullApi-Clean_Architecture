import { CreateUserDTO } from "../dto/CreateUserDTO";
import { User } from "../entities/user";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<CreateUserDTO, User> {
  findByEmail(email: string): Promise<User | null>;

  findAllUsers(): Promise<User[]>;
}

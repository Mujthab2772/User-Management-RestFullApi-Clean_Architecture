import { User } from "@prisma/client";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { IBaseRepository } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<CreateUserDTO> {
    findByEmail(email: string): Promise<User | null>

    findAllUsers(): Promise<User[]>
}
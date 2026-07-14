import { User } from "@prisma/client";
import { CreateUserDTO } from "../dto/CreateUserDTO.js";
import { IBaseRepository } from './IBaseRepository.js'

export interface IUserRepository extends IBaseRepository<CreateUserDTO> {
    findByEmail(email: string): Promise<User | null>

    findAllUsers(): Promise<User[]>
}
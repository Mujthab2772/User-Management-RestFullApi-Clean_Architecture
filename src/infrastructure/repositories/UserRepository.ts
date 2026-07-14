import { User } from "@prisma/client";
import { CreateUserDTO } from "../../domain/dto/CreateUserDTO.js";
import { IUserRepository } from "../../domain/interfaceRepositories/IUserRepository.js";
import { prisma } from "../database/prisma.js";

export class UserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<User> {
        return prisma.user.create({data})
    } 

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {id: id}
        })
    }

    async update(id: string, data: Partial<CreateUserDTO>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}})
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: {id: id}
        })
    }

    async findAllUsers(): Promise<User[]> {
        return prisma.user.findMany()
    }
}
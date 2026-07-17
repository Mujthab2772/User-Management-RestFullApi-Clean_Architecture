
import { CreateUserDTO } from "../../domain/dto/CreateUserDTO";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/interfaceRepositories/IUserRepository";
import { prisma } from "../database/prisma";

export class UserRepository implements IUserRepository {
    async create(data: CreateUserDTO): Promise<User> {
        const user = await prisma.user.create({data})
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.createdAt
        )
    } 

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {id: id}
        })

        if(!user) {
            return null
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.createdAt
        )
    }

    async update(id: string, data: Partial<CreateUserDTO>): Promise<User> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.createdAt
        )
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where: {email}})

        if(!user) {
            return null
        }

        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.createdAt
        )
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: {id: id}
        })
    }

    async findAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users.map(
            user =>
                new User(
                    user.id,
                    user.name,
                    user.email,
                    user.password,
                    user.role,
                    user.createdAt
                )
        );
    }
}
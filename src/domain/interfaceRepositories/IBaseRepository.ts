import { User } from "@prisma/client";

export interface IBaseRepository<T> {
    create(data: T): Promise<User>;

    findById(id: string): Promise<User | null>

    update(id: string, data: Partial<T>): Promise<User>

    delete(id: string): Promise<void>;
}
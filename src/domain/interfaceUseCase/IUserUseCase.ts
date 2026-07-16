import { CreateUserDTO } from "../dto/CreateUserDTO";
import { ResponseDTO } from "../dto/ResponseDTO";



export interface IUserUseCase {
    findUserById(id: string): Promise<ResponseDTO>;

    getUsers(): Promise<ResponseDTO[]>;

    updateUser(id: string, data: Partial<CreateUserDTO>): Promise<ResponseDTO>;

    deleteUser(id: string): Promise<any>;
}
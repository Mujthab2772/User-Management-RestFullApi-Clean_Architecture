import { CreateUserDTO } from "../dto/CreateUserDTO"
import { LoginDTO } from "../dto/LoginDTO";
import { ResponseDTO } from "../dto/ResponseDTO";

export interface AuthResponseDTO {
    userDetails: ResponseDTO
    token: string
}

export interface IAuthUseCase {

    register(data: CreateUserDTO): Promise<AuthResponseDTO>;

    login(data: LoginDTO): Promise<AuthResponseDTO>;

}
import { CreateUserDTO } from "../../domain/dto/CreateUserDTO";
import { ResponseDTO } from "../../domain/dto/ResponseDTO";
import { IAuditRepository } from "../../domain/interfaceRepositories/IAuditRepository";
import { IUserRepository } from "../../domain/interfaceRepositories/IUserRepository";
import { DeleteResponseDTO, IUserUseCase } from "../../domain/interfaceUseCase/IUserUseCase";
import { hashedPassword } from "../../shared/utils/hashingPassword";

export class UserService implements IUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private auditRepository: IAuditRepository
    ){}

    async findUserById(id: string): Promise<ResponseDTO> {
        const user = await this.userRepository.findById(id)

        if(!user) {
            throw new Error('User Not Found')
        }

        const { password, ...userDetails } = user;

        return userDetails;
    }

    async getUsers(): Promise<ResponseDTO[]> {
        const users =
        await this.userRepository.findAllUsers();

        const userDetails = users.map(({ password, ...user }) => user);
        return userDetails
    }

    async updateUser(id: string, data: Partial<CreateUserDTO>): Promise<ResponseDTO> {
        const existingUser = await this.userRepository.findById(id)

        if(!existingUser){
            throw new Error('user not found')
        }
        if(data.email) {
            const emailExists = await this.userRepository.findByEmail(data.email);

            if(emailExists && emailExists.id !== id) {
                throw new Error('Email already exists')
            }

        }

        if(data.password) {
            data.password = await hashedPassword(data.password)
        }

        const user = await this.userRepository.update(id, data)

        await this.auditRepository.createLog(
        "USER_UPDATED",
        id,
        "User updated successfully"
        )

        const { password, ...userDetails } = user;

        return userDetails


    }

    async deleteUser(id: string): Promise<DeleteResponseDTO> {

        const existingUser = await this.userRepository.findById(id)

        if(!existingUser){
            throw new Error('user not found')
        }

        await this.userRepository.delete(id)

        await this.auditRepository.createLog(
            "USER_DELETED",
            id,
            "User deleted successfully"
        )

        return {
            success: true,
            message: "User deleted successfully"
        }
    }

}
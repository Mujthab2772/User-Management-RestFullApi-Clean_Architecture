import { CreateUserDTO } from "../../domain/dto/CreateUserDTO.js";
import { IAuditRepository } from "../../domain/interfaceRepositories/IAuditRepository.js";
import { IUserRepository } from "../../domain/interfaceRepositories/IUserRepository.js";
import { hashedPassword } from "../../shared/utils/hashingPassword.js";

export class UserService {
    constructor(
        private userRepository: IUserRepository,
        private auditRepository: IAuditRepository
    ){}

    async findUserById(id: string) {
        const user = await this.userRepository.findById(id)

        if(!user) {
            throw new Error('User Not Found')
        }

        const { password, ...userDetails } = user;

        return userDetails;
    }

    async getUsers() {
        const users =
        await this.userRepository.findAllUsers();

        return users.map(({ password, ...user }) => user);
    }

    async updateUser(id: string, data: Partial<CreateUserDTO>) {
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

        return userDetails;


    }

    async deleteUser(id: string) {

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
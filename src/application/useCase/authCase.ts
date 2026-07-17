import { CreateUserDTO } from "../../domain/dto/CreateUserDTO";
import { LoginDTO } from "../../domain/dto/LoginDTO";
import { IAuditRepository } from "../../domain/interfaceRepositories/IAuditRepository";
import { IUserRepository } from "../../domain/interfaceRepositories/IUserRepository";
import { IAuthUseCase, AuthResponseDTO } from "../../domain/interfaceUseCase/IAuthUseCase";
import { confirmPassword, hashedPassword } from "../../shared/utils/hashingPassword";
import { generateToken } from "../../shared/utils/Jwt";

export class AuthService implements IAuthUseCase {
    constructor(
        private userRepository: IUserRepository,
        private auditRepository: IAuditRepository
    ) {}

    async register(data: CreateUserDTO): Promise<AuthResponseDTO> {
        const emailExists = await this.userRepository.findByEmail(data.email);

        if (emailExists) {
            throw new Error("Email already exists");
        }

        const hashedPass = await hashedPassword(data.password);

        const user = await this.userRepository.create({
            ...data,
            password: hashedPass,
        });

        await this.auditRepository.createLog(
            "USER_REGISTERED",
            user.id,
            "User registered successfully",
        );

        const token = generateToken(user.id, user.role)

        const {password, ...userDetails} = user

        return {
            userDetails,
            token
        }
    }

    async login(data: LoginDTO): Promise<AuthResponseDTO> {
        const user = await this.userRepository.findByEmail(data.email)

        if(!user) {
            throw new Error('Invalid credentials')
        }

        const isMatch = await confirmPassword(data.password, user.password)
        if(!isMatch){
            throw new Error('Invalid credentials')
        }

        await this.auditRepository.createLog(
            'USER_LOGIN',
            user.id,
            'User Logged successfully'
        )

        const token = generateToken(user.id, user.role)

        const {password, ...userDetails} = user

        return {
            userDetails,
            token
        }
    }
}

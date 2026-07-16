import { NextFunction, Request, Response } from "express";
import { IAuthUseCase } from "../../domain/interfaceUseCase/IAuthUseCase";

export class AuthController {
    constructor(private authService: IAuthUseCase){}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.register(req.body)

            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body)

            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}
import { NextFunction, Request, Response } from "express";
import { UserService } from "../../application/services/UserService.js";

export class UserController {
    constructor(private userService: UserService) {}

    findUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string
            const result = await this.userService.findUserById(id)
            
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.getUsers()

            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string

            const result = await this.userService.updateUser(id, req.body)

            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string

            const result = await this.userService.deleteUser(id)

            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
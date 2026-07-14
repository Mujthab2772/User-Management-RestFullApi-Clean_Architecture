import { IAuditRepository } from "../../domain/interfaceRepositories/IAuditRepository.js";
import { AuditLog } from "../schemas/AuditLogModel.js";

export class AuditLogRepository implements IAuditRepository {
    async createLog(action: string, userId: string, message: string): Promise<void> {
        await AuditLog.create({
            action,
            userId,
            message
        })
    }
}
export interface IAuditRepository {
    createLog(
        action: string,
        userId: string,
        message: string
    ): Promise<void>
}
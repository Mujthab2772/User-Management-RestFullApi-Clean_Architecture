

export interface IBaseRepository<ICreateUserDTO, IEntity> {
    create(data: ICreateUserDTO): Promise<IEntity>;

    findById(id: string): Promise<IEntity | null>

    update(id: string, data: Partial<ICreateUserDTO>): Promise<IEntity>

    delete(id: string): Promise<void>;
}
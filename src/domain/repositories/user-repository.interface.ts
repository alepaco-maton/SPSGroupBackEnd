import { User } from '../entities/user.entity';

export interface IUserRepository {
    exists(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
    list(): Promise<User[]>;
}

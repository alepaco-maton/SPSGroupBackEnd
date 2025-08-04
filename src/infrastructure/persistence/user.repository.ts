import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.value-object';
import { UserType, UserTypeEnum } from '../../domain/value-objects/type-user.value-object';

export class UserRepository implements IUserRepository {
    private users: Map<string, User> = new Map();

    constructor() {
        const emailOrError = Email.create('admin@spsgroup.com.br');
        const typeOrError = UserType.create(UserTypeEnum.ADMIN);

        if (emailOrError.isSuccess && typeOrError.isSuccess) {
            const adminUserOrError = User.create({
                name: 'admin',
                email: emailOrError.getValue(),
                password: '1234',
                type: typeOrError.getValue(),
            });

            if (adminUserOrError.isSuccess) {
                const adminUser = adminUserOrError.getValue();
                this.users.set(adminUser.id, adminUser);
            } else {
                console.error('[Error] No se pudo crear el usuario admin inicial:', adminUserOrError.error);
            }
        } else {
            console.error('[Error] Email o tipo inválido para admin');
        }
    }

    async exists(email: string): Promise<boolean> {
        return [...this.users.values()].some(user => user.email.getValue() === email);
    }

    async findByEmail(email: string): Promise<User | null> {
        const found = [...this.users.values()].find(user => user.email.getValue() === email);
        return found ?? null;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.get(id) ?? null;
    }

    async save(user: User): Promise<void> {
        this.users.set(user.id, user);
    }

    async update(user: User): Promise<void> {
        if (!this.users.has(user.id)) {
            throw new Error(`Usuario con ID ${user.id} no existe.`);
        }
        this.users.set(user.id, user);
    }

    async delete(id: string): Promise<void> {
        if (!this.users.has(id)) {
            throw new Error(`Usuario con ID ${id} no existe.`);
        }
        this.users.delete(id);
    }

    async list(): Promise<User[]> {
        return [...this.users.values()];
    }
}

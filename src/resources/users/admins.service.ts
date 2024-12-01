import { User } from '../../sequelize';

export class AdminsService { //TODO en fait c'est pas un service mais plutôt un repo, j'y vois pas vraiment de logique métier
    async findAll() {
        const users = await User.findAll();
        return users
    }

    async findOne(id: number) {
        const users = await User.findByPk(id);
        return users
    }

    async createUser(user: object) {
        await User.create({ ...user },
            { fields: ['name', 'firstName', 'email', 'password', 'description'] })
    }

    deleteUser(id: number) {
        return User.destroy({
            id: id,
        })
    }
}
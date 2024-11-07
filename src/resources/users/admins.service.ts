import { User } from '../../sequelize';

export class AdminsService { //TODO en fait c'est pas un service mais plutôt un repo, j'y vois pas vraiment de logique métier
    async FindAll() { //minuscule
        const users = await User.findAll();
        return users
    }

    async FindOne(id: number) {
        const users = await User.findByPk(id);
        return users
    }

    async CreateUser(user: object) {
        await User.create({ ...user },
            { fields: ['name', 'firstName', 'email', 'password', 'description'] })
    }

    DeleteUser(id: number) {
        return User.destroy({
            id: id,
        })
    }
}
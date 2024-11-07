import { User } from '~/sequelize'
import { Users } from '../../../types/users'

export class UsersService {

    async findAll() {
        const users = await User.findAll()
        return users
    }

    async findOne(id: number) {
        const user = await User.findByPk(id)
        return user
    }

    async findOneByEmail(email: string) {
        const user = await User.findOne({ where: { email: email } })
        return user
    }

    async createUser(user: Partial<Users>) {
        await User.create(user, {
            fields: ['name', 'firstName', 'email', 'password', 'description']
        })
    }

    async loginUser(user: Partial<Users>) {
        await User.login(user, {
            fields: ['email', 'password']
        })
    }

    async UpdateUser(user: Partial<Users>) {
        await User.update({ user }, { where: { email: User.email } })
    }
}
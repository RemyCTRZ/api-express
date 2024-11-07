import { Router } from 'express'
import { authenticateToken } from '~/middlewares/authenticateToken'
import { AdminsService } from '~/resources/users/admins.service'
import { User } from '../../sequelize'

require('dotenv').config()
const AdminsController = Router()
const service = new AdminsService()

// Route pour la connexion de l'admin

AdminsController.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })

        if (!user) {
            return res.status(400).send('Utilisateur introuvable')
        }

        await User.login(req.body.email, req.body.password)
    } catch (error) {
        return res.status(500).send('Erreur serveur')
    }
})

// Route pour récupérer la liste des utilisateurs

AdminsController.get('/', authenticateToken, async (req, res) => {
    return res
        .status(200)
        .json(await service.findAll()) //non catché
})

// Route pour récupérer les informations d'un utilisateur en particulier via son ID

AdminsController.get('/:id', authenticateToken, async (req, res) => {
    const userId: number = Number(req.params.id)

    try {
        await service.findOne(userId)
    } catch (error) {
        return res.status(500).send('Erreur serveur')
    }
})

// Route pour modifier les informations d'un utilisateur

AdminsController.post('/update', authenticateToken, async (req, res) => {
    const userToUpdate: { [key: string]: any }[] = req.body

    userToUpdate.forEach((property: any) => {
        if (!property) {
            return res.status(400).send('Champ manquant')
        }
    })

    const user = {
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        description: req.body.description
    }

    try {
        await User.update({ user }, { where: { email: User.email } })
    } catch (error) {
        return res.status(500).send('Erreur serveur')
    }
})

// Route pour supprimer un utilisateur via son ID

AdminsController.post('/delete', authenticateToken, (req, res) => {

    const id = req.body.id

    return res
        .status(200)
        .json(service.deleteUser(id)) //non catché

})

export { AdminsController }


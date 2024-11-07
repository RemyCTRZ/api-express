import { Router } from 'express'
import { authenticateToken } from '~/middlewares/authenticateToken'
import { UsersService } from '~/resources/users/users.service'


require('dotenv').config()
const bcrypt = require('bcrypt')
const UsersController = Router()

UsersController.get('/', async (_req, res) => {
    const users = await service.findAll()

    if (!users) return res.status(404).send('Aucun utilisateur trouvé')

    return res.status(200).json(users)
})

// Route pour la page de profil de l'utilisateur connecté

UsersController.get('/profile', authenticateToken, async (req, res) => {
    const user = await service.findOne(req.body.id)

    if (!user) return res.status(404).send('Utilisateur introuvable')

    return res.status(200).json(user)
})

// Route pour l'inscription

UsersController.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt() //TODO top
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user: object = {
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description
        }

        return res.status(200).json(await service.createUser(user))

    } catch (error) {
        res.status(500).send("Informations invalides")
    }
})

// Route pour que l'utilisateur se connecte (vérification mdp et token)

UsersController.post('/login', async (req, res) => {
    const user = await service.findOne(req.body.id)

    if (user == null) {
        return res.status(400).send('Utilisateur introuvable')
    }

    try {
        return res.status(200).json(await service.loginUser(user))
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour la modification des données de l'utilisateur

UsersController.post('/update', authenticateToken, async (req, res) => {
    const user = {
        email: req.body.email,
    }

    try {
        return res.status(200).json(service.UpdateUser(user))
    } catch {
        res.status(500).send('Erreur update')
    }
})

const service = new UsersService()

export { UsersController }


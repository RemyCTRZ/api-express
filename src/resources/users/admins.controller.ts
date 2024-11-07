import { Router } from 'express'
import { authenticateToken } from '~/middlewares/authenticateToken'
import { AdminsService } from '~/resources/users/admins.service'
import { User } from '../../sequelize'

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminsController = Router()
const service = new AdminsService()

// Route pour la connexion de l'admin

AdminsController.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } }) //TODO bug tueur d'appli, await non catché, les méthodes async ne sont pas catchés par votre middleware
    if (user == null) {
        return res.status(400).send('Utilisateur introuvable')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {//TODO c'est de la logique métier qui devrait être séparée
            const userEmail = req.body.email
            const accessToken = generateAccessToken(userEmail)

            function generateAccessToken(user: object) { //TODO pourquoi la function ici ?
                return jwt.sign({ email: user }, process.env.ACCESS_TOKEN_SECRET) //TODO pas de duration ?
            }

            return res.status(200).json({ accessToken: accessToken })
        } else {
            res.send('Connexion refusée') //TODO retourner un status
        }
    } catch {
        res.status(500).send('Opération échouée')
    }
})

// Route pour récupérer la liste des utilisateurs

AdminsController.get('/', authenticateToken, async (req, res) => {
    return res
        .status(200)
        .json(await service.FindAll()) //non catché
})

// Route pour récupérer les informations d'un utilisateur en particulier via son ID

AdminsController.get('/:id', authenticateToken, async (req, res) => {
    const id: number = Number(req.params.id) //non catché à vérifier si on passe des lettres le comportement
    return res
        .status(200)
        .json(await service.FindOne(id)) //non catché
})

// Route pour modifier les informations d'un utilisateur

AdminsController.post('/update', authenticateToken, async (req, res) => {

    const user = { //TODO validation ?
        name: req.body.name,
        firstName: req.body.firstName,
        email: req.body.email,
        description: req.body.description
    }

    await User.update({ user }, { where: { email: User.email } }) //non catché
})

// Route pour supprimer un utilisateur via son ID

AdminsController.post('/delete', authenticateToken, (req, res) => {

    const id = req.body.id

    return res
        .status(200)
        .json(service.DeleteUser(id)) //non catché

})

export { AdminsController }


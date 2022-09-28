require('dotenv').config()
import cors from 'cors'
import express, { Response } from 'express'
import { config } from '~/config'
import { UsersController } from '~/resources/users/users.controller'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'

/**
 * On crée une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

/**
 * Toutes les routes CRUD pour les animaux seronts préfixées par `/pets`
 */
app.use('/users', UsersController)

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get('/', (req, res) => res.send('🏠'))

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(config.API_PORT, () => console.log('Silence, ça tourne.'))
import { Response } from "express"
import jwt from 'jsonwebtoken'

require('dotenv').config()

export function authenticateToken(req: any, res: Response, next: Function) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        if (token == null) return res.sendStatus(401)

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            return res.sendStatus(500)
        }

        jwt.verify(token, secret, (err: any, user: any) => {

            if (err) return res.sendStatus(401)
            req.user = user
            next()
        })
    } catch (error) {
        console.log(error)
    }
}
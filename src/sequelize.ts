const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize('postgres://' + process.env.USER + ':' + process.env.PASSWORD + '@' + process.env.HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE)

export const User = sequelize.define('user', {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
},
    {
        freezeTableName: true
    })

// User.sync({ alter: true })

export const API_PORT = {
    API_PORT: 3001
}
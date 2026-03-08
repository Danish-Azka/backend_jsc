import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const Admin = db.define(
    "Admin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true
    }
    },
    {
        tableName: "admin",
    }
);




export default Admin;
    
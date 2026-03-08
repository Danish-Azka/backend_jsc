import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const Pengurus = db.define(
    "Pengurus", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Divisi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    },
    {
        tableName: "pengurus",
    }
);




export default Pengurus;
    
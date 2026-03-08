import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const Gallery = db.define(
    "Gallery", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
        tableName: "gallery",
    }
);




export default Gallery;
    
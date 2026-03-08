import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const Carousel = db.define(
    "Carousel", {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
        tableName: "carousel",
    }
);




export default Carousel;
    
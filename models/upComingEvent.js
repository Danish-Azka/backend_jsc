import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const UpComingEvent = db.define(
    "UpComingEvent", {
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
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        tableName: "upcomingevent",
    }
);




export default UpComingEvent;
    
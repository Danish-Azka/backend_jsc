import { DataTypes } from "sequelize";
import db from '../utils/connection.js'

const Blog = db.define(
    "Blog", {
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
    paper: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    },
    {
        tableName: "blog",
    }
);




export default Blog;
    
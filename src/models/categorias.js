import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Categoria  = sequelize.define('categoria',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagenUrl: {
        type : DataTypes.TEXT,
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        values: false
    }
},{
    tableName: 'categorias',
    timestamps: true
});

export default Categoria;
import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Producto = sequelize.define('producto',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_categoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'categorias',
            key: 'id'
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personalizacion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    kg: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    oferta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
    
},{
    tableName: 'productos',
    timestamps: true
});

export default Producto
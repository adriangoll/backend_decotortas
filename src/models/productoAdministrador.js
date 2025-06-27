import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const ProductoAdmin = sequelize.define('productoAdmin',{
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: 'productos',
            key: 'id'
        }
    },
    id_administrador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: 'administradores',
            key: 'id'
        }
    }
},{
    timestamps: true,
    tableName: 'productosAdmin'
});

export default ProductoAdmin
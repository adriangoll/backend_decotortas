import { Router } from "express";
import { Producto } from "../models/index.js";

const router = Router();

// --- GET /api/ruta (Obtener todos los camioneros) ---
// Esta ruta recuperará todos los camioneros de la base de datos.

router.get('/', async (req, res) => {
    try{
        // Categoria.findAll(): Método de Sequelize para obtener todos los registros
        // de la tabla asociada al modelo 'Camionero'.
        // Devuelve una promesa que resuelve con un array de instancias de Camionero.
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch(error){
        console.error("Error al obtener productos:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

// --- GET /api/camioneros/:cuit (Obtener un camionero por ID) ---
// Esta ruta recuperará un camionero específico basado en su ID.

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params; //Obtenemos el id con los parametros de la url
        // Camionero.findByPk(primaryKey): Método de Sequelize para buscar un registro
        // por su clave primaria (Primary Key). En este caso, 'cuit'.
        // Devuelve una promesa que resuelve con la instancia encontrada o null si no existe.
        const productos = await Producto.findByPk(id);
        if(id){
            res.status(200).json(productos);
        } else{
            res.status(400).json({message: 'Producto no encontrado no encontrado'})
        }
    } catch (error) {
        console.error("Error al obtener producto por id:", error);
        res.status(404).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- POST /api/camioneros (Crear un nuevo camionero) ---
// Esta ruta creará un nuevo camionero en la base de datos.

router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos enviados en el cuerpo de la solicitud HTTP (generalmente en formato JSON).
        // Camionero.create(data): Método de Sequelize para crear un nuevo registro.
        // 'data' es un objeto con los campos y valores del nuevo camionero.
        // Devuelve una promesa que resuelve con la instancia recién creada.
        const nuevaProducto = await Producto.create(req.body);
        res.status(201).json(nuevaProducto); //201 Created
    } catch (error) {
        console.error("Error al crear producto", error);
        //Manejo de excepciones específicos de Sequelize (ej: validaciones)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequalizeUniqueConstraintError') {
            return res.status(400).json({message: 'Error de validacion', errors: error.errors.map(e => e.message)});
        }
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- PUT /api/camioneros/:cuit (Actualizar un camionero existente) ---
// Esta ruta actualizará la información de un camionero existente.
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizar = req.body;

        // Primero buscamos el camionero para asegurarnos que existe
        const producto = await Producto.findByPk(id);
        if(producto){
            // camionero.update(data): Método de instancia de Sequelize para actualizar
            // los campos del registro. 'data' es un objeto con los campos a modificar.
            // Devuelve una promesa que resuelve con la instancia actualizada.
            const productoActualizado = await producto.update(datosActualizar);
            res.status(200).json(productoActualizado);
        } else{
            res.status(404).json({message: 'Error de validacion', errors: error.errors.map(e => e.message) });
        }
    } catch (error) {
        console.error("Error al actualizar el producto", error);
        if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({message:'Error de validacion', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
});

// --- DELETE /api/camioneros/:cuit (Eliminar un camionero) ---
// Esta ruta eliminará un camionero de la base de datos.
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        // Camionero.destroy({ where: { condicion } }): Método de Sequelize para eliminar
        // registros que cumplan con la condición especificada en 'where'.
        // Devuelve una promesa que resuelve con el número de filas eliminadas.
        const resultado = await Producto.destroy({
            where:{id: id}
        });
        if(resultado > 0){ // Si el resultado es mayor que 0, significa que se eliminó al menos una fila.
            res.status(200).json({message:'Producto eliminado exitosamente'}); // O 204 No Content si no se devuelve cuerpo
        } else{
            res.status(404).json({message: 'Producto no encontrado para eliminar'});
        }
    } catch(error){
        console.error("Error al eliminar producto", error);
        res.status(500).json({message:'Error interno del servidor', error: error.message});
    }
});

export default router;
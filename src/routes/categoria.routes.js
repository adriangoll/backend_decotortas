import { Router } from "express";
import { Categoria } from "../models/index.js";

const router = Router();

// --- GET /api/ruta (Obtener todos las categorias) ---
// Esta ruta recuperará todos las categorias de la base de datos.

router.get('/', async (req, res) => {
    try{
        // Categoria.findAll(): Método de Sequelize para obtener todos los registros
        // de la tabla asociada al modelo 'Categoria'.
        // Devuelve una promesa que resuelve con un array de instancias de Categoria.
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch(error){
        console.error("Error al obtener categorías:", error);
        res.status(500).json({message: 'Error interno del servidor', error: error.message});
    }
});

// --- GET /api/categoria/:id (Obtener un categoria por ID) ---
// Esta ruta recuperará una categoria específica basado en su ID.

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        if(categoria){
            res.status(200).json(categoria);
        } else{
            res.status(400).json({message: 'Categoria no encontrado'})
        }
    } catch (error) {
        console.error("Error al obtener categoría por id:", error);
        res.status(404).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- POST /api/categorias (Crear un nuevo categoria) ---
// Esta ruta creará un nuevo categoria en la base de datos.

router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos enviados en el cuerpo de la solicitud HTTP (generalmente en formato JSON).
        // Categoria.create(data): Método de Sequelize para crear un nuevo registro.
        // 'data' es un objeto con los campos y valores del nuevo categoria.
        // Devuelve una promesa que resuelve con la instancia recién creada.
        const nuevaCategoria = await Categoria.create(req.body);
        res.status(201).json(nuevaCategoria); //201 Created
    } catch (error) {
        console.error("Error al crear categoría", error);
        //Manejo de excepciones específicos de Sequelize (ej: validaciones)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({message: 'Error de validacion', errors: error.errors.map(e => e.message)});
        }
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- PUT /api/categorias/:cuit (Actualizar un categoria existente) ---
// Esta ruta actualizará la información de un categoria existente.
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizar = req.body;

        // Primero buscamos el categoria para asegurarnos que existe
        const categoria = await Categoria.findByPk(id);
        if(categoria){
            // categoria.update(data): Método de instancia de Sequelize para actualizar
            // los campos del registro. 'data' es un objeto con los campos a modificar.
            // Devuelve una promesa que resuelve con la instancia actualizada.
            const categoriaActualizada = await categoria.update(datosActualizar);
            res.status(200).json(categoriaActualizada);
        } else{
            res.status(404).json({message: 'Error de validacion', errors: error.errors.map(e => e.message) });
        }
    } catch (error) {
        console.error("Error al actualizar la categoría", error);
        if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({message:'Error de validacion', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
});

// --- DELETE /api/categorias/:cuit (Eliminar un categoria) ---
// Esta ruta eliminará un categoria de la base de datos.
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        // Categoria.destroy({ where: { condicion } }): Método de Sequelize para eliminar
        // registros que cumplan con la condición especificada en 'where'.
        // Devuelve una promesa que resuelve con el número de filas eliminadas.
        const resultado = await Categoria.destroy({
            where:{id: id}
        });
        if(resultado > 0){ // Si el resultado es mayor que 0, significa que se eliminó al menos una fila.
            res.status(200).json({message:'Categoria eliminada exitosamente'}); // O 204 No Content si no se devuelve cuerpo
        } else{
            res.status(404).json({message: 'Categoria no encontrada para eliminar'});
        }
    } catch(error){
        console.error("Error al eliminar categoria", error);
        res.status(500).json({message:'Error interno del servidor', error: error.message});
    }
});

export default router;

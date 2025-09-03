import { Router } from "express";
import { MetodoEnvio } from "../models/index.js";

const router = Router();

// --- GET /api/metodos-envio (Obtener todos los métodos de envío) ---
// Esta ruta recuperará todos los métodos de envío de la base de datos.

router.get('/', async (req, res) => {
    try{
        // MetodoEnvio.findAll(): Método de Sequelize para obtener todos los registros
        // de la tabla asociada al modelo 'MetodoEnvio'.
        // Devuelve una promesa que resuelve con un array de instancias de MetodoEnvio.
        const metodosEnvio = await MetodoEnvio.findAll();
        res.status(200).json(metodosEnvio);
    } catch(error){
        console.error("Error al obtener métodos de envío:", error);
        res.status(500).json({message: 'Error interno del servidor', error: error.message});
    }
});

// --- GET /api/metodos-envio/:id (Obtener un método de envío por ID) ---
// Esta ruta recuperará un método de envío específico basado en su ID.

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const metodoEnvio = await MetodoEnvio.findByPk(id);
        if(metodoEnvio){
            res.status(200).json(metodoEnvio);
        } else{
            res.status(404).json({message: 'Método de envío no encontrado'})
        }
    } catch (error) {
        console.error("Error al obtener método de envío por id:", error);
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- POST /api/metodos-envio (Crear un nuevo método de envío) ---
// Esta ruta creará un nuevo método de envío en la base de datos.

router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos enviados en el cuerpo de la solicitud HTTP (generalmente en formato JSON).
        // MetodoEnvio.create(data): Método de Sequelize para crear un nuevo registro.
        // 'data' es un objeto con los campos y valores del nuevo método de envío.
        // Devuelve una promesa que resuelve con la instancia recién creada.
        const nuevoMetodoEnvio = await MetodoEnvio.create(req.body);
        res.status(201).json(nuevoMetodoEnvio); //201 Created
    } catch (error) {
        console.error("Error al crear método de envío", error);
        //Manejo de excepciones específicos de Sequelize (ej: validaciones)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({message: 'Error de validacion', errors: error.errors.map(e => e.message)});
        }
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- PUT /api/metodos-envio/:id (Actualizar un método de envío existente) ---
// Esta ruta actualizará la información de un método de envío existente.
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizar = req.body;

        // Primero buscamos el método de envío para asegurarnos que existe
        const metodoEnvio = await MetodoEnvio.findByPk(id);
        if(metodoEnvio){
            // metodoEnvio.update(data): Método de instancia de Sequelize para actualizar
            // los campos del registro. 'data' es un objeto con los campos a modificar.
            // Devuelve una promesa que resuelve con la instancia actualizada.
            const metodoEnvioActualizado = await metodoEnvio.update(datosActualizar);
            res.status(200).json(metodoEnvioActualizado);
        } else{
            res.status(404).json({message: 'Método de envío no encontrado'});
        }
    } catch (error) {
        console.error("Error al actualizar el método de envío", error);
        if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({message:'Error de validacion', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
});

// --- DELETE /api/metodos-envio/:id (Eliminar un método de envío) ---
// Esta ruta eliminará un método de envío de la base de datos.
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        // MetodoEnvio.destroy({ where: { condicion } }): Método de Sequelize para eliminar
        // registros que cumplan con la condición especificada en 'where'.
        // Devuelve una promesa que resuelve con el número de filas eliminadas.
        const resultado = await MetodoEnvio.destroy({
            where:{id: id}
        });
        if(resultado > 0){ // Si el resultado es mayor que 0, significa que se eliminó al menos una fila.
            res.status(200).json({message:'Método de envío eliminado exitosamente'}); // O 204 No Content si no se devuelve cuerpo
        } else{
            res.status(404).json({message: 'Método de envío no encontrado para eliminar'});
        }
    } catch(error){
        console.error("Error al eliminar método de envío", error);
        res.status(500).json({message:'Error interno del servidor', error: error.message});
    }
});

export default router;
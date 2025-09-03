import { Router } from "express";
import { MetodoPago } from "../models/index.js";

const router = Router();

// --- GET /api/metodos-pago (Obtener todos los métodos de pago) ---
// Esta ruta recuperará todos los métodos de pago de la base de datos.

router.get('/', async (req, res) => {
    try{
        // MetodoPago.findAll(): Método de Sequelize para obtener todos los registros
        // de la tabla asociada al modelo 'MetodoPago'.
        // Devuelve una promesa que resuelve con un array de instancias de MetodoPago.
        const metodosPago = await MetodoPago.findAll();
        res.status(200).json(metodosPago);
    } catch(error){
        console.error("Error al obtener métodos de pago:", error);
        res.status(500).json({message: 'Error interno del servidor', error: error.message});
    }
});

// --- GET /api/metodos-pago/:id (Obtener un método de pago por ID) ---
// Esta ruta recuperará un método de pago específico basado en su ID.

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const metodoPago = await MetodoPago.findByPk(id);
        if(metodoPago){
            res.status(200).json(metodoPago);
        } else{
            res.status(404).json({message: 'Método de pago no encontrado'})
        }
    } catch (error) {
        console.error("Error al obtener método de pago por id:", error);
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- POST /api/metodos-pago (Crear un nuevo método de pago) ---
// Esta ruta creará un nuevo método de pago en la base de datos.

router.post('/', async (req, res) => {
    try {
        // req.body contiene los datos enviados en el cuerpo de la solicitud HTTP (generalmente en formato JSON).
        // MetodoPago.create(data): Método de Sequelize para crear un nuevo registro.
        // 'data' es un objeto con los campos y valores del nuevo método de pago.
        // Devuelve una promesa que resuelve con la instancia recién creada.
        const nuevoMetodoPago = await MetodoPago.create(req.body);
        res.status(201).json(nuevoMetodoPago); //201 Created
    } catch (error) {
        console.error("Error al crear método de pago", error);
        //Manejo de excepciones específicos de Sequelize (ej: validaciones)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({message: 'Error de validacion', errors: error.errors.map(e => e.message)});
        }
        res.status(500).json({message: 'Error interno del servidor', error: error.message})
    }
});

// --- PUT /api/metodos-pago/:id (Actualizar un método de pago existente) ---
// Esta ruta actualizará la información de un método de pago existente.
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const datosActualizar = req.body;

        // Primero buscamos el método de pago para asegurarnos que existe
        const metodoPago = await MetodoPago.findByPk(id);
        if(metodoPago){
            // metodoPago.update(data): Método de instancia de Sequelize para actualizar
            // los campos del registro. 'data' es un objeto con los campos a modificar.
            // Devuelve una promesa que resuelve con la instancia actualizada.
            const metodoPagoActualizado = await metodoPago.update(datosActualizar);
            res.status(200).json(metodoPagoActualizado);
        } else{
            res.status(404).json({message: 'Método de pago no encontrado'});
        }
    } catch (error) {
        console.error("Error al actualizar el método de pago", error);
        if(error.name === 'SequelizeValidationError'){
            return res.status(400).json({message:'Error de validacion', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({message: "Error interno del servidor", error: error.message});
    }
});

// --- DELETE /api/metodos-pago/:id (Eliminar un método de pago) ---
// Esta ruta eliminará un método de pago de la base de datos.
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        // MetodoPago.destroy({ where: { condicion } }): Método de Sequelize para eliminar
        // registros que cumplan con la condición especificada en 'where'.
        // Devuelve una promesa que resuelve con el número de filas eliminadas.
        const resultado = await MetodoPago.destroy({
            where:{id: id}
        });
        if(resultado > 0){ // Si el resultado es mayor que 0, significa que se eliminó al menos una fila.
            res.status(200).json({message:'Método de pago eliminado exitosamente'}); // O 204 No Content si no se devuelve cuerpo
        } else{
            res.status(404).json({message: 'Método de pago no encontrado para eliminar'});
        }
    } catch(error){
        console.error("Error al eliminar método de pago", error);
        res.status(500).json({message:'Error interno del servidor', error: error.message});
    }
});

export default router;
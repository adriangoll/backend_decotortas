import {Router} from "express";
import  {Mensaje}  from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const mensaje = await Mensaje.findAll();
        res.status(200).json(mensaje);
    } catch(error){
        console.error("Error al obtener los Mensajes:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const mensaje = await Mensaje.findByPk(id);
        if(id){
            res.status(200).json(mensaje);
        } else{
            res.status(400).json({message: "Mensaje no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener Mensaje por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});

// GET /api/productos/:id_producto/mensajes
router.get('/api/productos/:id_producto/mensajes', async (req, res) => {
    try {
        const { id_producto } = req.params;
        const mensajes = await Mensaje.findAll({ where: { id_producto } });
        res.status(200).json(mensajes);
    } catch (error) {
        console.error("Error al obtener mensajes del producto:", error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// POST /api/productos/:id_producto/mensajes
router.post('/api/productos/:id_producto/mensajes', async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ message: "El campo 'texto' es obligatorio." });
        }

        const nuevoMensaje = await Mensaje.create({
            id_producto,
            texto
        });

        res.status(201).json(nuevoMensaje);
    } catch (error) {
        console.error("Error al crear mensaje:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: 'Error de validación',
                errors: error.errors.map(e => e.message)
            });
        }
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoMensaje = await Mensaje.create(req.body);
        res.status(200).json(nuevoMensaje);
    } catch(error){
        console.error("Error al crear el mensaje", error);
        if(error.name === 'SequalizeValidationError' || error.name === 'SequalizeUniqueConstraintError'){
            return res.status(400).json({message: 'Error de validacion', errors: error.errors.map(e => e.message)})
        }
        res.status(500).json({message:"Error interno de servidor", error: error.message})
    }
});

router.put('/:id', async(req, res)=>{
    try{ 
        const{id} = req.params;
        const datosActualizar = req.body;
        const mensaje = await Mensaje.findByPk();

        if(carrito){
            const mensajeActualizado = await mensaje.update(datosActualizar);
            res.status(200).json(mensajeActualizado);
        } else{
            res.status(404).json({message: 'Error de validacion', errors: error.map(e=>e.message)});
        }
    } catch(error){
        console.error("Error al actualizar", error);
        if(error.name === 'SequalizeValidationError'){
            return res.status(400).json({message:"Error de validacion", errors: error.map(e=> e.message)});
        }
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const resultado = await Mensaje.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "mensaje eliminado exitosamente"});
        } else{
            res.status(404).json({message: "mensaje no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el mensaje", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
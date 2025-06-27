import {Router} from "express";
import { Invitacion } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const invitacion = await Invitacion.findAll();
        res.status(200).json(invitacion);
    } catch(error){
        console.error("Error al obtener las Invitacion:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const invitacion = await Invitacion.findByPk(id);
        if(id){
            res.status(200).json(invitacion);
        } else{
            res.status(400).json({message: "Invitacion no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener invitacion por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoInvitacion = await Invitacion.create(req.body);
        res.status(200).json(nuevoInvitacion);
    } catch(error){
        console.error("Error al crear la Invitacion", error);
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
        const invitacion = await Invitacion.findByPk();

        if(carrito){
            const InvitacionActualizado = await invitacion.update(datosActualizar);
            res.status(200).json(InvitacionActualizado);
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
        const resultado = await Invitacion.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "invitacion eliminado exitosamente"});
        } else{
            res.status(404).json({message: "invitacion no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar la invitacion", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
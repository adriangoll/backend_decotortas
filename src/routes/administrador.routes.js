import {Router} from "express";
import { Administrador } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const administrador = await Administrador.findAll();
        res.status(200).json(administrador);
    } catch(error){
        console.error("Error al obtener los administradores:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const administrador = await Administrador.findByPk(id);
        if(administrador){
            res.status(200).json(administrador);
        } else{
            res.status(400).json({message: "administrador no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener Administrador por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoadmin = await Administrador.create(req.body);
        res.status(200).json(nuevoadmin);
    } catch(error){
        console.error("Error al crear el Administrador", error);
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
        const administrador = await Administrador.findByPk();

        if(administrador){
            const administradorActualizado = await administrador.update(datosActualizar);
            res.status(200).json(administradorActualizado);
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
        const resultado = await Administrador.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "Administrador eliminado exitosamente"});
        } else{
            res.status(404).json({message: "Administrador no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el Administrador", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
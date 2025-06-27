import {Router} from "express";
import { Usuario } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const usuario = await Usuario.findAll();
        res.status(200).json(usuario);
    } catch(error){
        console.error("Error al obtener los Usuarios:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id);
        if(id){
            res.status(200).json(usuario);
        } else{
            res.status(400).json({message: "Usuario no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener Usuario por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(200).json(nuevoUsuario);
    } catch(error){
        console.error("Error al crear el usuario", error);
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
        const usuario = await Usuario.findByPk();

        if(usuario){
            const usuarioActualizado = await usuario.update(datosActualizar);
            res.status(200).json(usuarioActualizado);
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
        const resultado = await Usuario.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "Usuario eliminado exitosamente"});
        } else{
            res.status(404).json({message: "Usuario no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el Usuario", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
import {Router} from "express";
import { Carrito } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const carrito = await Carrito.findAll();
        res.status(200).json(carrito);
    } catch(error){
        console.error("Error al obtener los Carritos:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const carrito = await Carrito.findByPk(id);
        if(carrito){
            res.status(200).json(carrito);
        } else{
            res.status(400).json({message: "carrito no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener Carrito por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoCarrito = await Carrito.create(req.body);
        res.status(200).json(nuevoCarrito);
    } catch(error){
        console.error("Error al crear el carrito", error);
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
        const carrito = await Carrito.findByPk();

        if(carrito){
            const carritoActualizado = await carrito.update(datosActualizar);
            res.status(200).json(carritoActualizado);
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
        const resultado = await Carrito.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "carrito eliminado exitosamente"});
        } else{
            res.status(404).json({message: "carrito no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el carrito", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
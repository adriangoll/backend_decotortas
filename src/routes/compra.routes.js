import {Router} from "express";
import { Compra } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const compra = await Compra.findAll();
        res.status(200).json(compra);
    } catch(error){
        console.error("Error al obtener los Compras:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const compra = await Compra.findByPk(id);
        if(compra){
            res.status(200).json(compra);
        } else{
            res.status(400).json({message: "compra no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener Compra por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoCompra = await Compra.create(req.body);
        res.status(200).json(nuevoCompra);
    } catch(error){
        console.error("Error al crear la compra", error);
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
        const compra = await Compra.findByPk(id);

        if(compra){
            const compraActualizada = await compra.update(datosActualizar);
            res.status(200).json(compraActualizada);
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
        const resultado = await Compra.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "compra eliminado exitosamente"});
        } else{
            res.status(404).json({message: "compra no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el compra", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
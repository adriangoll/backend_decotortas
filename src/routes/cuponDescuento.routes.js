import {Router} from "express";
import { CuponDescuento } from "../models/index.js";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const cuponDescuento = await CuponDescuento.findAll();
        res.status(200).json(cuponDescuento);
    } catch(error){
        console.error("Error al obtener los CuponDescuentos:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const cuponDescuento = await CuponDescuento.findByPk(id);
        if(cuponDescuento){
            res.status(200).json(cuponDescuento);
        } else{
            res.status(400).json({message: "cuponDescuento no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener CuponDescuento por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});
router.get('/:cuponDescuento', async(req, res)=>{
    try{
        const {cuponDescuento} = req.params;
        const cupon = await CuponDescuento.findOne({where:{ cuponDescuento : cuponDescuento}});
        if(cupon){
            res.status(200).json(cupon);
        } else{
            res.status(400).json({message: "cuponDescuento no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener CuponDescuento por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoCupon = await CuponDescuento.create(req.body);
        res.status(200).json(nuevoCupon);
    } catch(error){
        console.error("Error al crear el cuponDescuento", error);
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
        const cupon = await CuponDescuento.findByPk(id);

        if(cupon){
            const cuponActualizado = await cuponDescuento.update(datosActualizar);
            res.status(200).json(cuponActualizado);
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
        const resultado = await CuponDescuento.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "cuponDescuento eliminado exitosamente"});
        } else{
            res.status(404).json({message: "cuponDescuento no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el cuponDescuento", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
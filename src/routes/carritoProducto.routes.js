import {Router} from "express";
import { CarritoProducto } from "../models/index.js";
import { where } from "sequelize";

const router = Router();

router.get('/', async(req, res)=>{
    try{
        const carritoProductos = await CarritoProducto.findAll();
        res.status(200).json(carritoProductos);
    } catch(error){
        console.error("Error al obtener los CarritoProductos:", error);
        res.status(500).json({message: 'Error interno del servidor', error: message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const carritoProducto = await CarritoProducto.findByPk(id);
        if(carritoProducto){
            res.status(200).json(carritoProducto);
        } else{
            res.status(400).json({message: "carritoProducto no encontrado"});
        }
    } catch(error){
        console.error("Error al obtener CarritoProducto por id", error);
        res.status(500).json({message: "Error interno del servidor", error: error.message})
    }
});


router.post('/', async(req, res)=>{
    try{
        const nuevoCarritoProducto = await CarritoProducto.create(req.body);
        res.status(200).json(nuevoCarritoProducto);
    } catch(error){
        console.error("Error al crear el carritoProducto", error);
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
        const carritoProducto = await CarritoProducto.findByPk(id);

        if(carritoProducto){
            const carritoProductoactualizado = await carritoProducto.update(datosActualizar);
            res.status(200).json(carritoProductoactualizado);
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
        const resultado = await CarritoProducto.destroy({where:{id : id}});
        if(resultado > 0){
            res.status(200).json({message: "carritoProducto eliminado exitosamente"});
        } else{
            res.status(404).json({message: "carritoProducto no encontrado"})
        }
    } catch(error){
        console.error("Error al encontrar el carritoProducto", error);
        res.status(500).json({message: "Error interno de servidor", error: error.message})
    }
});

export default router;
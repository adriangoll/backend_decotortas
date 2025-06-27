import express from 'express';
import sequelize from './src/db/connection.js';
import administradorRoute from'./src/routes/administrador.routes.js';
import carritoRoute from'./src/routes/carrito.routes.js';
import carritoProductoRoute from'./src/routes/carritoProducto.routes.js';
import categoriaRoute from'./src/routes/categoria.routes.js';
import compraRoute from'./src/routes/compra.routes.js';
import invitacionRoute from'./src/routes/invitacion.routes.js';
import productoRoute from'./src/routes/producto.routes.js';
import usuarioRoute from'./src/routes/usuario.routes.js';
import cuponDescuento from './src/routes/cuponDescuento.routes.js';
import mensajeRoute from './src/routes/mensaje.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Ruta de prueba

app.get('/', (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ mensaje: 'Servidor operativo' });
});

app.use('/api/categoria', categoriaRoute);
app.use('/api/carrito', carritoRoute);
app.use('/api/carritoProducto', carritoProductoRoute);
app.use('/api/administrador', administradorRoute);
app.use('/api/compra', compraRoute);
app.use('/api/invitacion', invitacionRoute);
app.use('/api/producto', productoRoute);
app.use('/api/usuario', usuarioRoute);
app.use('/api/cupones', cuponDescuento);
app.use('/api/mensajes', mensajeRoute);

//Iniciar servidor y probar coneccion DB

async function starServer() {
    try{
        //Intenta autenticar la db
        await sequelize.authenticate();
        console.log('✅ Conexxion con la base de datos extablecida correctamente');
        await sequelize.sync({ alter: true }); // o alter: true
        console.log('🧱 Tablas sincronizadas');
        app.listen(PORT, ()=>{
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            
        })
    } catch(error){
        console.error('❌ No se pudo conectar a la base de datos:', error);
        
    }
    
}

starServer()


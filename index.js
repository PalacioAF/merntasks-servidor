const express=require('express');
const conectarDB=require('./config/db');
const cors=require('cors');

//crear servidor
const app=express();

//conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//Habilitar express.json
app.use(express.json({extended:true}));

//Puerto
const port=process.env.PORT ||5000;

//Importar Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

//Arrancar
app.listen(port,'0.0.0.0',()=>{
    console.log('Bienvenido AFPalacio');
});
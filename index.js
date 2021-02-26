const express=require('express');
const conectarDB=require('./config/db');
const cors=require('cors');

//crear servidor
const app=express();

//conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({extended:true}));

//Puerto
const PORT=process.env.PORT||4000;

//Importar Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

//Arrancar
app.listen(PORT,()=>{
    console.log('Bienvenido Palacio');
});
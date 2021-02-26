const Usuario=require('../models/Usuario');
const bcryptjs=require('bcryptjs');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.crearUsuario=async (req,res)=>{

    //Revisar si hay errores
    const errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const{email,password}=req.body;

    try {
        let usuario=await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg:'El usuario ya existe'});
        }

        //crea el nuevo usuario
        usuario=new Usuario(req.body);

        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        usuario.password=await bcryptjs.hash(password,salt);

        //guarda usuario
        await usuario.save();

        //crear y firmar el JWT
        const payload={
            usuario:{
                id:usuario.id
            }
        }

        //firmar el JWT
        jwt.sign(payload,process.env.SECRET,{
            expiresIn:3600
        },(error,token)=>{
            if(error) throw error;

            //Mensaje
            res.json({msg:'Usuario creado correctamente',token});
        }
        )
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
    
}
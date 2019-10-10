const fs = require('fs');

let listadoPorHacer = [];

const guardaDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json',data, (err) => {
        if(err) throw new Error('No se pudo guardar el archivo',err);
    });
}

const cargarDB = () => {
    try{
    listadoPorHacer = require('../db/data.json');
    } catch(e){
        listadoPorHacer = [];
    }
 
}

const getListado = (propiedad, criterio) => {
    cargarDB();
    if (propiedad === 'descripcion' && criterio === ''){
    return listadoPorHacer;
    }
    switch (propiedad) {
        case 'descripcion' : 
            return filtrar(listadoPorHacer, criterio, propiedad)
        case 'completado' :
            return filtrar(listadoPorHacer, stringToBool(criterio), propiedad);;
        default :
            console.log('Esa propiedad no existe en la lista de tareas'.red);
            return listadoPorHacer;
    }
    
}

const stringToBool= string => (string=='true')?true:false;

const filtrar = (listado,filtro,propiedad) => {
    const filtrado = listado.filter(elem => elem[propiedad] === filtro)
    return filtrado;
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion );
    if (listadoPorHacer.length === nuevoListado.length){
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }
    

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado:false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = stringToBool(completado);
        guardaDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
const descripcion = {
        demand:true,
        alias: 'd',
        desc: 'Descripcion de la tarea'};

const completado = {
    default: false,
    alias: 'c',
    desc: 'Marca como completada o pendiente una tarea'
}
const criterio = {
    default: '',
    alias: 'c',
    desc: 'Criterio para filtrar la lista'
}
const propiedad = {
    default: 'descripcion',
    alias: 'p',
    desc: 'Propiedad que filtraremos en la lista'
}


const argv = require('yargs')
                .command('crear','Crear un elemento por hacer', {
                    descripcion
                })
                .command('borrar','Borra una tarea', {
                    descripcion
                })
                .command('listar','Muestra un listado de las tareas filtradas por la (p)ropiedad y el (c)riterio ingresados',{
                    propiedad,
                    criterio
                })
                .command('actualizar','Actualiza el estado completado de una tarea', {
                    descripcion,
                    completado
                })
                .help()
                .argv;

module.exports = {
    argv
}
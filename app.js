const argv = require('./config/yargs').argv;

const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado(argv.propiedad,argv.criterio);
        
        for (let tarea of listado){
            console.log("=========================".green);
            console.log(tarea.descripcion);
            console.log('Estado :', tarea.completado );
            console.log("=========================".green);
        }
        break;
    case 'actualizar':
        let exito = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(exito);
        break;
    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        borrar?console.log("Se ha borrado el registro"):console.log("No se borro el registro");
        break;
    default:
        console.log("comando no reconocido");
        break;
}
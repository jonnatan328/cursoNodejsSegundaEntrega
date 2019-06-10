const fs = require ("fs");

var listaAspirantes = [];

const crear = (aspirante) => {
    listar();
    let est = {
        nombre: aspirante.nombre,
        matematicas: aspirante.matematicas,
        ingles: aspirante.ingles,
        programacion: aspirante.programacion
    };
    let duplicado = listaAspirantes.find(nomb => nomb.nombre == aspirante.nombre);
    if (!duplicado) {
        listaAspirantes.push(est);
        console.log(listaAspirantes);
        guardar();
    } else {
        console.log('Ya existe otro aspirante con el mismo nombre');
    }
}

const listar = () => {
    try {
        listaAspirantes = require('./listado.json');
        // listaAspirantes = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaAspirantes = [];
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaAspirantes);
    fs.writeFile('listado.json', datos, (err) => {
        if (err) {
            throw (err);
        }
        console.log('Archivo creado con éxito');
    })
}

const mostrar = () => {
    listar();
    console.log('Notas de los aspirantes');
    
    listaAspirantes.forEach(aspirante => {
        console.log(aspirante.nombre);
        console.log('notas: ');
        console.log('matematicas' + aspirante.matematicas);
        console.log('ingles' + aspirante.ingles);
        console.log('programación' + aspirante.programacion + '\n');
    });
}

const mostrarest = (nom) => {
    listar()
    let est = listaAspirantes.find(buscar => buscar.nombre == nom);
    if (!est) {
        console.log('No existe este aspirante');
        
    } else {
        console.log(est.nombre);
        console.log('notas: ');
        console.log('matematicas' + est.matematicas);
        console.log('ingles' + est.ingles);
        console.log('programación' + est.programacion + '\n');
        
    }
}

const mostrarmat = () => {
    listar()
    let ganan = listaAspirantes.filter(mat => mat.matematicas >= 3);
    if (ganan.length == 0) {
        console.log('Ningún aspirante a ganado');
    }else {
        ganan.forEach(aspirante => {
            console.log(aspirante.nombre);
            console.log('notas: ');
            console.log('matematicas' + aspirante.matematicas);
        });
    }
}

const actualizar = (nom, asignatura, calificacion) => {
    listar();
    let encontrado = listaAspirantes.find(buscar => buscar.nombre == nom);
    if (!encontrado) {
        console.log('No existe este aspirante');
    } else {
        encontrado[asignatura] = calificacion;
        guardar()        
    }
}

const eliminar = (nom) => {
    listar();
    let nuevo = listaAspirantes.filter(mat => mat.nombre != nom);
    if (nuevo.length == listaAspirantes.length) {
        console.log('Ningún aspirante tiene el nombre');
    }else {
        listaAspirantes = nuevo;
        guardar()
    }
}

module.exports = {
    crear,
    mostrar,
    mostrarest,
    mostrarmat,
    actualizar,
    eliminar
}
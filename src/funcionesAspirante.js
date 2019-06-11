const fs = require ("fs");

var listaAspirantes = [];

const crear = (aspirante) => {
    listar();
    let aspiranteAux = listaAspirantes.filter(doc => doc.documento == aspirante.documento);
    if (aspirante.length == 0) {
        listaAspirantes.push(aspirante);
        console.log(listaAspirantes);
        guardarAspirante();
        return true;
    } else {
        let inscrito = aspiranteAux.find(asp => asp.curso == aspirante.curso);
        if (!inscrito) {
            listaAspirantes.push(aspirante);
            console.log(listaAspirantes);
            guardarAspirante();
            return true;
        }else{
            return false;
            console.log('Ya existe una inscripción al curso');
        }
    }
}

const listar = () => {
    try {
        listaAspirantes = require('../listadoAspirante.json');
        // listaAspirantes = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaAspirantes = [];
    }
}

const guardarAspirante = () => {
    let datos = JSON.stringify(listaAspirantes);
    fs.writeFile('listadoAspirante.json', datos, (err) => {
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
    actualizar,
    eliminar
}
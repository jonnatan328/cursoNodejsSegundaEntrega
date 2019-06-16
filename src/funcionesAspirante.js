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
    } catch (error) {
        listaAspirantes = [];
    }
}

const guardarAspirante = (resolve) => {
    let datos = JSON.stringify(listaAspirantes);
    fs.writeFile('listadoAspirante.json', datos, (err) => {
        if (err) {
            throw (err);
        }
        // Se elimina los aspirantes de la cache para que recarge los aspirantes
        delete require.cache[require.resolve('../listadoAspirante.json')];
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

const eliminar = (id) => {
    listar();
    let nuevo = listaAspirantes.filter(mat => mat.documento != id);
    if (nuevo.length == listaAspirantes.length) {
        console.log('Ningún aspirante tiene el documento');
        rejected(id);
    }else {
        console.log('Se elimino el aspirante', id);
        listaAspirantes = nuevo;
        guardarAspirante();
    }
}

module.exports = {
    crear,
    mostrar,
    actualizar,
    eliminar
}
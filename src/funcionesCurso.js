const fs = require ("fs");

var listaCursos = [];

const crear = (curso) => {
    listar();
    let duplicado = listaCursos.find(cur => cur.id == curso.id);
    if (!duplicado) {
        listaCursos.push(curso);
        console.log('Listado de cursos: ', listaCursos);
        guardar();
    } else {
        console.log('Ya existe otro curso con el mismo nombre');
    }
}

const listar = () => {
    try {
        listaCursos = require('../listadoCursos.json');
        // listaCursos = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaCursos = [];
    }
}

const guardar = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listadoCursos.json', datos, (err) => {
        if (err) {
            throw (err);
        }
        console.log('Archivo creado con éxito');
    })
}

const mostrar = () => {
    listar();
    console.log('Notas de los cursos');
    
    listaCursos.forEach(curso => {
        console.log(curso.nombre);
        console.log('notas: ');
        console.log('matematicas' + curso.matematicas);
        console.log('ingles' + curso.ingles);
        console.log('programación' + curso.programacion + '\n');
    });
}

const getById = (cursoId) => {
    listar()
    let curs = listaCursos.find(buscar => buscar.id == cursoId);
    if (!curs) {
        console.log('No existe este curso');
        
    } else {
        return curs;
    }
}

const actualizar = (nom, asignatura, calificacion) => {
    listar();
    let encontrado = listaCursos.find(buscar => buscar.nombre == nom);
    if (!encontrado) {
        console.log('No existe este curso');
    } else {
        encontrado[asignatura] = calificacion;
        guardar()        
    }
}

const eliminar = (nom) => {
    listar();
    let nuevo = listaCursos.filter(mat => mat.nombre != nom);
    if (nuevo.length == listaCursos.length) {
        console.log('Ningún Curso tiene el nombre');
    }else {
        listaCursos = nuevo;
        guardar()
    }
}

module.exports = {
    crear,
    mostrar,
    getById,
    actualizar,
    eliminar
}
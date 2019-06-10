const fs = require ("fs");

var listaCursos = [];

const crear = (curso) => {
    listar();
    // let curso = {
    //     id: curs.id,
    //     nombre: curs.nombre,
    //     descripcion: curs.descripcion,
    //     valor: curs.valor,
    //     programacion: curs.programacion
    // };
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

const mostrarest = (nom) => {
    listar()
    let est = listaCursos.find(buscar => buscar.nombre == nom);
    if (!est) {
        console.log('No existe este curso');
        
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
    let ganan = listaCursos.filter(mat => mat.matematicas >= 3);
    if (ganan.length == 0) {
        console.log('Ningún curso a ganado');
    }else {
        ganan.forEach(curso => {
            console.log(curso.nombre);
            console.log('notas: ');
            console.log('matematicas' + curso.matematicas);
        });
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
    mostrarest,
    mostrarmat,
    actualizar,
    eliminar
}
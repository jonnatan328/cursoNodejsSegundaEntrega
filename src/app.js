const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const funcionesCurso = require('./funcionesCurso');
const funcionesAspirante = require('./funcionesAspirante');
require('./helpers');

const directorioPublico = path.join(__dirname,'../public');
const directorioPartials = path.join(__dirname,'../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('inicio');
})

app.get('/crear-curso', (req, res) => {
    res.render('cursos/crearCurso');
})

app.get('/listar-cursos', (req, res) => {
    res.render('cursos/listarCursos');
})

app.get('/inscribir', (req, res) => {
    res.render('aspirantes/crearAspirante');
})

app.get('/ver-inscritos', (req, res) => {
    res.render('aspirantes/mostrarInscritos');
})

app.post('/guardarCurso', (req, res) => {
    console.log('body', req.body);
    
    let curso = {
        id: req.body.cursoId,
        nombre: req.body.name,
        descripcion: req.body.description,
        valor: req.body.cost,
        estado: 'disponible'
    }

    if (req.body.modality) {
        curso.modalidad = req.body.modality
    }
    if (req.body.hoursAmount) {
        curso.intensidadHoras = req.body.hoursAmount
    }

    funcionesCurso.crear(curso);
    res.render('cursos/listarCursos');

})

app.post('/guardarInscripcion', (req, res) => {
    console.log('body', req.body);
    
    let aspirante = {
        documento: req.body.aspiranteId,
        correoElectronico: req.body.correoElectronico,
        nombre: req.body.name,
        telefono: req.body.telefono,
        curso: req.body.curso
    }

    let inscrito = funcionesAspirante.crear(aspirante);
    if (inscrito) {
        let curso = funcionesCurso.getById(req.body.curso);
        res.render('aspirantes/exitoInscripcion', {
            estudiante: req.body.name,
            nombreCurso: curso.nombre
        });
    } else {
        res.render('aspirantes/errorInscripcion');
    }

})
app.post('/actualizarEstado', (req, res) => {
    console.log('body', req.body);

    funcionesCurso.actualizar(req.body.cursoId);
    res.render('cursos/listarCursos');

})

app.post('/eliminar-aspirante', (req, res) => {
    funcionesAspirante.eliminar(req.body.id);
    setTimeout(function() {
        res.render('aspirantes/mostrarInscritos')
    }, 3000);
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})



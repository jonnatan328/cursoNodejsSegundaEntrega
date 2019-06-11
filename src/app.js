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
    res.render('inicio', {
        titulo: 'Segunda entrega'
    });
})

app.get('/crear-curso', (req, res) => {
    res.render('cursos/crearCurso', {
        titulo: 'Segunda entrega'
    });
})

app.get('/listar-cursos', (req, res) => {
    res.render('cursos/listarCursos', {
        titulo: 'Segunda entrega'
    });
})

app.get('/inscribir', (req, res) => {
    res.render('aspirantes/crearAspirante', {
        titulo: 'Segunda entrega'
    });
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
    res.render('cursos/listarCursos', {
        titulo: 'Segunda entrega'
    });

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
        res.render('aspirantes/exitoInscripcion', {
            titulo: 'Segunda entrega'
        });
    } else {
        res.render('aspirantes/errorInscripcion', {
            titulo: 'Segunda entrega'
        });
    }

})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
})



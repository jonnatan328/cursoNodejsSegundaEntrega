const hbs = require('hbs');

hbs.registerHelper('listar',() => {
    try {
        listaCursos = require('../listadoCursos.json');
        // listaCursos = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaCursos = [];
    }
    
    let texto = '<table class="table table-bordered"> \
                <thead class="thead-dark"> \
                <th> Id </th> \
                <th> Nombre </th> \
                <th> Descripción </th> \
                <th> Valor </th> \
                <th> Modalidad </th> \
                <th> Intensidad </th> \
                <th> Estado </th> \
                <th style="width:10%" > Opciones </th> \
                </thead> \
                <tbody>';
        listaCursos.forEach(curso => {
        texto = texto +
                '<tr>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td>' + curso.modalidad + '</td>' +
                '<td>' + curso.intensidadHoras + '</td>' +
                '<td>' + curso.estado + '</td>' +
                '<td >' + 
                    '<form action="/actualizarEstado" method="post">' +
                        '<input type="hidden" name="cursoId" value="' + curso.id + '" />' +
                        '<input type="submit" class="btn btn-md btn-primary" name="actualizar" value="Actualizar estado" />' +
                    '</form>' + 
                '</td></tr>';
    });

    texto = texto + '</tbody></table>';
    return texto;
})

hbs.registerHelper('listarComoInteresado', () => {
    try {
        listaCursos = require('../listadoCursos.json');
        // listaCursos = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaCursos = [];
    }
    let cursosDisponibles = listaCursos.filter(est => est.estado == 'disponible');
    console.log('Cursos' , listaCursos);

    let texto = '<div id="accordion">';
    cursosDisponibles.forEach(curso => {
        texto = texto +
                '<div class="card">' +
                '<div class="card-header" id="' + curso.id + '">' +
                '<h5 class="mb-0">' +
                '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#card' + curso.id + '" aria-expanded="false" aria-controls="card' + curso.id + '">' +
                '<strong>' + curso.nombre + ': </strong><span>' + curso.descripcion + '</span></br>' + 
                '<strong>$' + curso.valor + '</strong>' +
                '</button>' +
                '</h5>' +
                '</div>' +
                '<div id="card' + curso.id + '" class="collapse" aria-labelledby="' + curso.id + '" data-parent="#accordion">' +
                '<div class="card-body">' +
                '<strong>Nombre: </strong>' + curso.nombre + '</br>' +
                '<strong>Valor: </strong>$' + curso.valor + '</br>' +
                '<strong>Descripción: </strong>' + curso.descripcion + '</br>' +
                '<strong>Modalidad: </strong>' + curso.modalidad + '</br>' +
                '<strong>Intensidad: </strong>' + curso.intensidadHoras +
                '</div>' + 
                '</div>' + 
                '</div>';
    });

    texto = texto + '</div>';
    return texto;
})

hbs.registerHelper('listarInscritosPorCurso', () => {
    try {
        listaCursos = require('../listadoCursos.json');
        listaAspirantes = require('../listadoAspirante.json');
        // listaCursos = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaCursos = [];
    }
    let cursosDisponibles = listaCursos.filter(est => est.estado == 'disponible');

    let texto = '<div id="accordion">';
    cursosDisponibles.forEach(curso => {
        texto = texto +
                '<div class="card">' +
                    '<div class="card-header" id="' + curso.id + '">' +
                        '<h5 class="mb-0">' +
                        '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#card' + curso.id + '" aria-expanded="false" aria-controls="card' + curso.id + '">' +
                            '<strong>Nombre del curso: </strong><span>' + curso.nombre + '</span></br>' + 
                        '</button>' +
                        '</h5>' +
                    '</div>' +
                    '<div id="card' + curso.id + '" class="collapse" aria-labelledby="' + curso.id + '" data-parent="#accordion">' +
                        '<div class="card-body">' +
                            '<table class="table table-bordered">' +
                            '<thead class="thead-dark">' +
                            '<th> Documento </th>' +
                            '<th> Nombre </th>' +
                            '<th> Correo </th>' +
                            '<th> Teléfono </th>' +
                            '<th> Eliminar </th>' +
                            '</thead>' +
                            '<tbody>';
                        let aspirantesInscritos = listaAspirantes.filter(curs => curs.curso == curso.id);
                        aspirantesInscritos.forEach(aspirante => {
                            texto = texto +
                                '<tr>' +
                                '<td>' + aspirante.documento + '</td>' +
                                '<td>' + aspirante.nombre + '</td>' +
                                '<td>' + aspirante.correoElectronico + '</td>' +
                                '<td>' + aspirante.telefono + '</td>' +
                                '<td>' + aspirante.telefono + '</td></tr>';
                        });
                        texto = texto + '</tbody></table>' +
                        '</div>' + 
                    '</div>' + 
                '</div>';
    });

    texto = texto + '</div>';
    return texto;
})

hbs.registerHelper('listarEnSelect', () => {
    try {
        listaCursos = require('../listadoCursos.json');
        // listaCursos = JSON.parse(fs.readFileSync('listado.json')) //si necesitamos obtenerlos de forma asincronica
    } catch (error) {
        listaCursos = [];
    }
    let cursosDisponibles = listaCursos.filter(est => est.estado == 'disponible');
    console.log('Cursos' , listaCursos);

    let texto = '';
    cursosDisponibles.forEach(curso => {
        texto += '<option value="' + curso.id + '">' + curso.nombre + '</option>'
    });

    return texto;
})
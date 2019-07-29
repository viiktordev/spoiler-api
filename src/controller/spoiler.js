const Spoiler = require('../model/spoiler');

exports.buscar = (req, resp, next) => {
    const id = req.params.id;

    Spoiler.findByPk(id)
        .then(spoiler => {
            (spoiler) ? resp.send(spoiler) : resp.status(404).send;
        })
        .catch(error => next(error));
}

exports.criar = (request, response, next) => {
    const titulo = request.body.titulo
    const espoliador = request.body.espoliador
    const descricao = request.body.descricao
 
    Spoiler.create({
        titulo: titulo,
        espoliador: espoliador,
        descricao: descricao
    }).then(() => {
        response.status(201).send()
    }).catch((error) => next(error))
}

exports.atualizar = (request, response, next) => {
    const id = request.params.id
 
    const titulo = request.body.titulo
    const espoliador = request.body.espoliador
    const descricao = request.body.descricao
 
    Spoiler.findById(id).then((spoiler) => {
        if (spoiler) {
            Spoiler.update({
                titulo: titulo,
                espoliador: espoliador,
                descricao: descricao
            }, { where: { id: id } }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))
}

exports.excluir = (request, response, next) => {
    const id = request.params.id
 
    Spoiler.findById(id).then((spoiler) => {
        if (spoiler) {
            Spoiler.destroy({
                where: { id: id }
            }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))
}
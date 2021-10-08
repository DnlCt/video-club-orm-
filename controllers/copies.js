const express = require('express');
const { Copy } = require('../db');

function list(req, res, next) {
    Copy.findAll({inlude:['movies']})
                .then(objects => res.json(objects))
                .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
                .then(object => res.json(object))
                .catch(err => res.send(err));
}

function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;
    let copy = new Object({
    number:number,
    format:format,
    movieId:movieId,
    status:status
    });
    Copy.create(copy)
                .then(obj => res.json(obj))
                .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id).then((object) => {
        const number = req.body.number ? req.body.number : object.number;
        const format = req.body.format ? req.body.format : "";
        const movieId = req.body.movieId ? req.body.movieId : object.movieId;
        const status = req.body.status ? req.body.status : object.status;
        object.update({number:number,format:format,movieId:movieId,status:status})
        .then(copy => res.json(copy))
        })
        .catch(err => res.send(err));
}

function edit(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id).then((object) => {
        const number = req.body.number ? req.body.number : object.number;
        const format = req.body.format ? req.body.format : object.format;
        const movieId = req.body.movieId ? req.body.movieId : object.movieId;
        const status = req.body.status ? req.body.status : object.status;
        object.update({number:number,format:format,movieId:movieId,status:status})
        .then(copy => res.json(copy))
        })
        .catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.destroy({where:{id:id}})
                .then(object => res.json(object))
                .catch(err => res.send(err));
}

module.exports = {
  list, index, create, replace, edit, destroy
}

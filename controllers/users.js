const express = require('express');

function list(req, res, next) {
    res.send('Lista de usuarios del sistema');
}
function index(req, res, next) {
  res.send(`Usuario del sistema con un ID = ${req.params.id}`);
}
function create(req, res, next) {
  res.send('Crear una usuario nuevo');
}
function replace(req, res, next) {
  res.send(`Reemplazo de usuario con un ID = ${req.params.id}`);
}
function edit(req, res, next) {
  res.send(`Editar usuario con un ID = ${req.params.id}`);
}
function destroy(req, res, next) {
  res.send(`Eliminar usuario con un ID = ${req.params.id}`);
}
module.exports = {
    list, index, create, replace, edit, destroy
}
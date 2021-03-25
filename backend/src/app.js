import express from 'express'; //const express = require('express');
import mongoose from 'mongoose';
import routes from './routes'; //const routes = require('./routes');


class App{
  constructor(){
    this.server = express();
    mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.cqxma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true, //coonfigurar para usar um novo formato de url
      useUnifiedTopology: true, //necessário para rodar o bdd --- the core brains of the driver(server selection, server discovery and monitoring)
    });
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server; //module.exports = new App().server;

//estrutura de criação -> MVC - Model(tabela no banco, esquema da aplicação), View(front end), Controller(tem como objetivo tratar as requisições)
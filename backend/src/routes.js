import {Router} from 'express'; //const {Router} = require('express'); //só importa a aprte de rotas
import SessionController from './controllers/SessionController';
const routes = new Router();

routes.post('/sessions', SessionController.store);

export default routes; //module.exports = routes;
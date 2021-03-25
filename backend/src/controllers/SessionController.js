//métodos: index(listagem de sessões), show(listar uma ÚNICA sessaão), update(alterar alguma sessão), store(criar uma sessão), destroy(deletar uma sessão)

import { json } from 'express';

import User from '../models/User';

class SessionController{
  async store(req, res){
    const { email } = req.body;
    let user = await User.findOne({email}); //procurar o user no bdd
    if(!user){
      user = await User.create({ email }); //cria um novo usuário no bdd
    }
    return res.json(user);
    //pode demorar para receber a requisição, por isso põe o await(parte assíncrona) para esperar essa requisição e depois de feita vai passar a linha
  }
}

export default new SessionController();


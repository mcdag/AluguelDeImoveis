import {Schema, model} from 'mongoose'; //apenas quero o esquema e o model

const UserSchema = new Schema({
  email: String, //só será necessário o email para realizar o cadastro
});

export default model('User', UserSchema);
const { json } = require('express');
const express = require('express');

const server = express();

server.use(express.json());


const cursos = ['Node JS', 'JS', 'React Native'];

//Middleware Global
server.use((req, res, next) => {
  console.log(`URL CHAMADA: ${req.url}!`);
  return next();
});

//Middleware
function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: "Nome do curso é obrigatório"});
  }
  return next();
}

//Middleware
function checkIndexCurso(req, res, next){
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(400).json({error: "O curso não existe"});
  }
  req.curso = curso;
  return next();
}

//CRUD - create, read, update, delete

//READ --- GET
//Ler todos os cursos
server.get('/cursos', (req, res) => {
  return res.json(cursos);
});

//Ler um único curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  //const {index} = req.params;
  //return res.json(cursos[index]);
  return res.json(req.curso);
  
});

//CREATE --- POST
//Criando um curso
server.post('/cursos', checkCurso, (req, res) => {
  const {name} = req.body;
  cursos.push(name); //adiciona no array cursos
  return res.json(cursos);//devolve todos os cursos
});

//UPDATE -- PUT
//Atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  cursos[index] = name;//atualiza o curso
  return res.json(cursos);//devolve todos os cursos
});

//DELETE -- DELETE
//Deletando um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const {index} = req.params;
  cursos.splice(index, 1);//remove o curso no indice index
  return res.json(cursos);//devolve todos os cursos
});


server.listen(3000);






/*

query params = ?nome=NodeJS -- passamos na frente da rota
route paramns = /curso/2 -- passamos na rota
request body = { nome:'"Nodejs', tipo: 'Backend'} -- manda um objeto dentro do corpo da requisição

localhost:3000/cursos?nome=Node JS
server.get('/curso', (req, res) => {
  const nome = req.query.nome; --criamos a constante nome sendo uma req.query.nome
  return res.json({curso: `Aprendendo ${nome}`}); --conseguimos printar na página um json a a frase+constante
})

localhost:3000/cursos/:id
server.get('/curso:id', (req, res) => {
  const id = req.params.id;
  return res.json({curso: `Aprendendo ${id}`});
})

-------------------------------------------------------------

server.get('/curso', (req, res) => {
  console.log("HELLO WORLD!");
} print no console, mas não na página)

server.get('/curso', (req, res) => {
  return res.send("HELLO WORLD!");
} printa na páigna, resposta da requisição)

server.get('/curso', (req, res) => {
  return res.json({ curso: "node js"});
} printa na página, resposta da requisição, poŕem é um json)

*/

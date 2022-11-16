//READ ME
// Esse é um server simples desenvolvido com http que simula um CRUD (Creat, Read, Update & Delete)
//How to use it:
//No terminal rodar --> node app.js --> para iniciar o server
//http://localhost:3000/create-update-usuario?id=1&nome=rafael&idade=31
//http://localhost:3000/create-update-usuario?id=1&nome=rafael&idade=32
//http://localhost:3000/select-usuario?id=1
//http://localhost:3000/delete-usuario?id=1


// Incluindo a biblioteca HTTP
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');


// definindo URL ou endereço com porta
const hostname = '127.0.0.1';
const port = 3000;

// cria um objeto pro servidor --> Implementa a regra de negócio
const server = http.createServer((req, res) => {

  var resposta = '';
  const urlparse = url.parse(req.url, true);
  //receber informacoes
  const params = queryString.parse(urlparse.search);

  //CREATE / UPDATE
  if(urlparse.pathname == '/create-update-usuario'){
    //salvar informacoes
    fs.writeFile('./users/'+ params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved successufuly:' + JSON.stringify(params));
    });

    resposta = 'Usuario criado com sucesso';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);

    //limpando o arquivo undefined.txt
    fs.unlink('./users/undefined.txt', function () {

    });
  }
  
  //SELECT
  else if (urlparse.pathname == '/select-usuario') {
    fs.readFile('./users/'+ params.id + '.txt', function(err, data) {

      resposta = err? "Usuario não encontrado" : data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }
  
  //DELETE
  else if (urlparse.pathname == '/delete-usuario') {
    fs.unlink('./users/'+ params.id + '.txt', function (err) {

      resposta = err? "Usuario nao encontrado" : 'Usuario Deletado com sucesso!';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
  
  //HOME-INTRO
  else if (urlparse.pathname == '/') {
    resposta = `How to use it:
                http://localhost:3000/create-update-usuario?id=1&nome=rafael&idade=31

                http://localhost:3000/create-update-usuario?id=1&nome=rafael&idade=32

                http://localhost:3000/select-usuario?id=1

                http://localhost:3000/delete-usuario?id=1`;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  }

});

//execução do server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

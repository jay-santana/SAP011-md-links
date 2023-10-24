const fs = require('fs');
const { extractLinks } = require('./index.js');

// Função para ler links
function mdLinks(filePath) {
  return fs.promises.readFile(filePath, 'utf8')
    .then((data) => {
      return extractLinks(data, filePath);
    });
};

// function lerArquivo(caminhoDoArquivo) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
//       if (err) reject(err);

//       resolve(data);
//     });
//   });
// }


module.exports = { mdLinks };

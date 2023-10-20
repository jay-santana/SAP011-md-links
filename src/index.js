const fs = require('fs');

function lerArquivo(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}
module.exports = { lerArquivo };

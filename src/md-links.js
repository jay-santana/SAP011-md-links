const fs = require('fs');
const path = require('path');
const { extractLinks, validateLinks } = require('./index.js');

// Função para tratar links
function mdLinks(filePath, options) {
  const fileExtension = path.extname(filePath);
  return new Promise((resolve, reject) => {
    if (fileExtension !== '.md') {
      return reject(new Error('A extensão do arquivo não é .md'));
    }
    fs.promises.readFile(filePath, 'utf8')
      .then((data) => {
        const links = extractLinks(data, filePath);
        if (options.validate === true) {
          return resolve(validateLinks(links));
        }
        return resolve(links);
      })
      .catch((err) => {
        return reject(new Error('O arquivo não pôde ser lido: ', err.message));
      });
  });
}

// condicional para stats
// condicional para validate e stats

module.exports = { mdLinks };

// Função para ler links
// function mdLinks(filePath, options) {
//   return fs.promises.readFile(filePath, 'utf8')
//     .then((data) => {
//       const links = extractLinks(data, filePath);
//       if (options.validate === true) {
//         return validateLinks(links);
//       };
//       return links;
//     });
// };

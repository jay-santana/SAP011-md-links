const fs = require('fs');
const path = require('path');
const { extractLinks, validateLinks } = require('./index.js');

// // Função para ler links
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
function mdLinks(filePath, options) {
  const fileExtension = path.extname(filePath);
  if (fileExtension !== '.md') {
    return Promise.reject(new Error('A extensão do arquivo não é .md'));
  }
  return fs.promises.readFile(filePath, 'utf8')
    .then((data) => {
      const links = extractLinks(data, filePath);
      if (options.validate === true) {
        return validateLinks(links);
      }
      return links;
    })
    .catch((err) => {
      return Promise.reject(new Error('O arquivo não pôde ser lido: ' + err.message));
    });
}

// function mdLinks(filePath, options) {
//   const fileExtension = path.extname(filePath);
//   return new Promise((resolve, reject) => {
//     if (fileExtension !== '.md') {
//       return reject(new Error('A extensão do arquivo não é .md'));
//     }
//     fs.promises.readFile(filePath, 'utf8')
//       .then((data) => {
//         const links = extractLinks(data, filePath);
//         if (options.validate === true) {
//           return validateLinks(links);
//         }
//         resolve(links);
//       })
//       .catch((err) => {
//         reject(new Error('O arquivo não pôde ser lido: ' + err.message));
//       });
//   });
// }


// condicional para stats
// condicional para validate e stats

module.exports = { mdLinks };

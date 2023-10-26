const fs = require('fs');
const path = require('path');
const { extractLinks, validateLinks, statsLinks } = require('./index');

// Função para tratar links
function mdLinks(filePath, options) {
  const fileExtension = path.extname(filePath);
  return new Promise((resolve, reject) => {
    if (fileExtension !== '.md') {
      reject(new Error('Erro: A extensão do arquivo não é .md'));
    } else {
      fs.promises.readFile(filePath, 'utf8')
        .then((data) => {
          const links = extractLinks(data, filePath);
          if (options.validate === true && options.stats === true) {
            if (links.length === 0) {
              reject(new Error('Erro: O arquivo não possui links'));
            } else {
              validateLinks(links)
                .then((validatedLinks) => {
                  const stats = statsLinks(validatedLinks);
                  resolve(stats);
                })
                .catch((err) => reject(new Error(`Erro na validação de links - ${err.message}`)));
            }
          } else if (options.validate === true) {
            if (links.length === 0) {
              reject(new Error('Erro: O arquivo não possui links'));
            } else {
              resolve(validateLinks(links));
            }
          } else if (options.stats === true) {
            if (links.length === 0) {
              reject(new Error('Erro: O arquivo não possui links'));
            } else {
              resolve(statsLinks(links));
            }
          } else {
            resolve(links);
          }
        })
        .catch((err) => reject(new Error(`Erro: O arquivo não pôde ser lido - ${err.message}`)));
    }
  });
}

// condicional para stats
// condicional para validate e stats

module.exports = { mdLinks };

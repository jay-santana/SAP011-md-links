const fs = require('fs');
const path = require('path');
const { extractLinks, validateLinks, statsLinks } = require('./index');

// Função para tratar opções de chamada dos links
function mdLinks(filePath, options) {
  const fileExtension = path.extname(filePath);
  return new Promise((resolve, reject) => {
    if (fileExtension !== '.md') {
      reject(new Error('A extensão do arquivo não é .md'));
    } else {
      fs.promises.readFile(filePath, 'utf8')
        .then((data) => {
          const links = extractLinks(data, filePath);
          if (options.validate === true && options.stats === true) {
            if (links.length === 0) {
              reject(new Error('O arquivo não possui links'));
            } else {
              validateLinks(links)
                .then((validatedLinks) => {
                  const stats = statsLinks(validatedLinks);
                  resolve(stats);
                })
                .catch(() => reject(new Error(`Erro na validação de links`)));
            }
          } else if (options.validate === true) {
            if (links.length === 0) {
              reject(new Error('O arquivo não possui links'));
            } else {
              resolve(validateLinks(links));
            }
          } else if (options.stats === true) {
            if (links.length === 0) {
              reject(new Error('O arquivo não possui links'));
            } else {
              resolve(statsLinks(links));
            }
          } else {
            resolve(links);
          }
        })
        .catch(() => reject(new Error(`O arquivo não pôde ser lido`)));
    }
  });
}

module.exports = { mdLinks };

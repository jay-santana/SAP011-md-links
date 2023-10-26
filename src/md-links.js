const fs = require('fs');
const path = require('path');
const { extractLinks, validateLinks, statsLinks } = require('./index.js');

// Função para tratar links
function mdLinks(filePath, options) {
  const fileExtension = path.extname(filePath);
  return new Promise((resolve, reject) => {
    if (fileExtension !== '.md') {
      return reject(new Error('Erro: A extensão do arquivo não é .md'));
    }
    fs.promises.readFile(filePath, 'utf8')
      .then((data) => {
        const links = extractLinks(data, filePath);
        if (options.validate === true && options.stats === true) {
          if (links.length === 0) {
            return reject(new Error('Erro: O arquivo não possui links'));
          }
          const validatedLinks = validateLinks(links);
          const stats = statsLinks(validatedLinks);
          resolve({ links: validatedLinks, stats });
        } else if (options.validate === true) {
          if (links.length === 0) {
            return reject(new Error('Erro: O arquivo não possui links'));
          }
          resolve(validateLinks(links));
        } else if (options.stats === true) {
          if (links.length === 0) {
            return reject(new Error('Erro: O arquivo não possui links'));
          }
          resolve(statsLinks(links));
        } else {
          resolve(links);
        }
      })
      .catch((err) => {
        return reject(new Error('Erro: O arquivo não pôde ser lido - ' + err.message));
      });
  });
}

// condicional para stats
// condicional para validate e stats

module.exports = { mdLinks };

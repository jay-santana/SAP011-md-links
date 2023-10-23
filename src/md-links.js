const fs = require('fs');
const { extractLinks } = require('./index.js');

// Função para extrair links
function mdLinks(filePath) {
  return fs.promises.readFile(filePath, 'utf8')
    .then((data) => {
      return extractLinks(data, filePath);
    });
};

module.exports = { mdLinks };

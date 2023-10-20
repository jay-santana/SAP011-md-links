const fs = require('fs');

// Função para extrair links
function extractLinks(inputs) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  return fs.promises.readFile(inputs, 'utf8')
    .then((data) => {
      const getFileLinks = [...data.matchAll(regex)];
      const linkResults = getFileLinks.map((link) => ({
        text: link[1],
        url: link[2],
        file: inputs,
      }));
      return linkResults;
    });
};

module.exports = { extractLinks };

//Leitura do aquivo aqui
//Validação dos links


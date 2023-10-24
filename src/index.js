const fs = require('fs');
// const { extractLinks } = require('./index.js');

// Função para extrair links
function extractLinks(data, filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const getFileLinks = [...data.matchAll(regex)];
  const linkResults = getFileLinks.map((link) => ({
    text: link[1],
    url: link[2],
    file: filePath,
  }));
  return linkResults;
}

// Função para validar links
function validateLinks(getFileLinks) {
  return Promise.all(
    getFileLinks.map((link) => {
      // console.log(link);
      return fetch(link.url)
        .then((response) => ({
          ...link,
          valid: response.status >= 200 && response.status < 400
        }))
        .catch(() => ({
          ...link,
          valid: false
        }));
    },
    ),
  );
};

module.exports = { extractLinks, validateLinks };

//Leitura do aquivo
//Extração dos links e textos
//Validação dos links (válidos e inválidos)
//Estatísticas dos links (total de links, links únicos e links quebrados)


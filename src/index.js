const fs = require('fs');
// const { extractLinks } = require('./index.js');


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



module.exports = { extractLinks };

//Leitura do aquivo aqui
//Validação dos links


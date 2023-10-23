#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');

const filePath = process.argv[2];
console.log('caminho do arquivo', process.argv);

mdLinks(filePath)
  .then((linkResults) => {
    console.log((showResults(linkResults)));
    // console.log(linkResults);
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao extrair links:', error);
  });
  // console.log(mdLinks(filePath));

// Função para mostrar resultados (texto e links)
function showResults(linkResults) {
  const results = linkResults.map((link) => `${chalk.magenta('Texto do link:')} ${link.text} 
  ${chalk.green('href:')} ${link.url}`) 
  return results.join('\n')
}

module.exports = { showResults };




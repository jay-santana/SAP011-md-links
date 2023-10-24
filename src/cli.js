#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');
const { validateLinks } = require('./index.js');


const filePath = process.argv[2];
console.log('caminho do arquivo', process.argv);

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(filePath)
  .then((linkResults) => {
    console.log((showResults(linkResults)));
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao extrair links:', error);
  });

mdLinks(filePath, { validate: true })
  .then((linkResults) => {
    validateLinks(linkResults).then((linksResultsValidate) => {
      linksResultsValidate.map((link) => {
        const status = link.valid ? 'Válido' : 'Inválido';
        console.log(`\u2022 ${chalk.magenta('Texto do link:')} ${link.text} || ${chalk.green('Status:')} ${status}`);
      });
    });
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao validar links:', error);
  });

// Função para mostrar resultados (texto e links)
function showResults(linkResults) {
  const results = linkResults.map((link) =>
    `\u2022 ${chalk.magenta('Texto do link:')} ${link.text} 
  ${chalk.green('href:')} ${link.url}
  ${chalk.yellow('Arquivo')} ${link.file} `);
  return results.join('\n');
}

module.exports = { showResults };


// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }, ...]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }, ...]
//   })
//   .catch(console.error);

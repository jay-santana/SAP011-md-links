#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');

const filePath = process.argv[2];
console.log('caminho do arquivo', process.argv);

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
}

mdLinks(filePath, options)
  .then((linkResults) => {
    if (options.validate === true) {
      linkResults.map((link) => {
        const status = link.valid ? 'Válido' : 'Inválido';
        console.log(`\u2022 ${chalk.magenta('Texto do link:')} ${chalk.cyan(link.text)} || ${chalk.magenta('Status:')} ${chalk.green(status)}`);
      });
    } else {
      console.log((showResults(linkResults)));
    }
  })
  .catch((error) => {
    if (options.validate === true) {
      console.error('Ocorreu um erro ao validar links:', error);
    } else {
      console.error('Ocorreu um erro ao extrair links:', error)
    }
  });

// Função para mostrar resultados (texto e links)
function showResults(linkResults) {
  const results = linkResults.map((link) =>
    `\u2022 ${chalk.green('Texto do link:')} ${chalk.magenta(link.text)} 
  ${chalk.magenta('href:')} ${chalk.cyan(link.url)}
  ${chalk.magenta('Arquivo')} ${chalk.cyan(link.file)} `);
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

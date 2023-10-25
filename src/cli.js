#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');

const filePath = process.argv[2];
console.log('caminho do arquivo', process.argv);

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

// Função para mostrar resultados dos textos e links extraídos
function showExtractedLinks(linkResults) {
  const results = linkResults.map((link) => `\u2022 ${chalk.green('Texto do link:')} ${chalk.magenta(link.text)}
  ${chalk.magenta('href:')} ${chalk.cyan(link.url)}
  ${chalk.magenta('Arquivo')} ${chalk.cyan(link.file)} `);
  return results.join('\n');
}

// Função para mostrar resultado dos links válidos e inválidos
function showValidatedLinks(linkResults) {
  const validationResults = linkResults.map((link) => {
    const status = link.valid ? chalk.green('Válido') : chalk.red('Inválido');
    return `\u2022 ${chalk.green('Texto do link:')} ${chalk.magenta(link.text)}
  ${chalk.magenta('Status:')} ${status}
  ${chalk.magenta('Arquivo:')} ${chalk.cyan(link.file)}`;
  });
  return validationResults.join('\n');
}

mdLinks(filePath, options)
  .then((linkResults) => {
    if (options.validate === true) {
      console.log(showValidatedLinks(linkResults));
    } else {
      console.log(showExtractedLinks(linkResults));
    }
  })
  .catch((error) => {
    if (options.validate === true) {
      console.error('Ocorreu um erro ao validar links:', error);
    } else {
      console.error('Ocorreu um erro ao extrair links:', error);
    }
  });

module.exports = { showExtractedLinks, showValidatedLinks };

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

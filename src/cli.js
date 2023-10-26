#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links');

const filePath = process.argv[2];
console.log('caminho do arquivo', process.argv);

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

// Função para mostrar resultados dos textos e links extraídos
function showLinkExtraction(linkResults) {
  const extractedResults = linkResults.map((link) => `\u2022 ${chalk.green('Texto do link:')} ${chalk.magenta(link.text)}
  ${chalk.magenta('href:')} ${chalk.cyan(link.url)}
  ${chalk.magenta('Arquivo')} ${chalk.cyan(link.file)}`);
  return extractedResults.join('\n');
}

// Função para mostrar resultado dos links válidos e inválidos
function showLinkValidation(linkResults) {
  const validationResults = linkResults.map((link) => {
    const status = link.valid ? chalk.green('Válido') : chalk.red('Inválido');
    return `\u2022 ${chalk.green('Texto do link:')} ${chalk.magenta(link.text)}
  ${chalk.magenta('Status:')} ${status}
  ${chalk.magenta('Arquivo:')} ${chalk.cyan(link.file)}`;
  });
  return validationResults.join('\n');
}

// Função para mostrar resultado da estatística dos links
function showLinkStats(link) {
  return `${chalk.green('Total de Links:')} ${chalk.magenta(link.total)}
${chalk.magenta('Links Únicos:')} ${chalk.cyan(link.unique)}`;
}

// Função para mostrar resultado da validação e estatística dos links
function showLinksValidationAndStats(link) {
  console.log(link);
  return `${chalk.green('Total de Links:')} ${chalk.magenta(link.total)}
${chalk.magenta('Links Únicos:')} ${chalk.cyan(link.unique)}
${chalk.red('Links Quebrados:')} ${chalk.red(link.broken)}`;
}

// Função para tratar
mdLinks(filePath, options)
  .then((linkResults) => {
    if (options.validate === true && options.stats === true) {
      console.log(showLinksValidationAndStats(linkResults));
    } else if (options.validate === true) {
      console.log(showLinkValidation(linkResults));
    } else if (options.stats === true) {
      console.log(showLinkStats(linkResults));
    } else {
      console.log(showLinkExtraction(linkResults));
    }
  })
  .catch((error) => {
    if (options.stats === true && options.validate === true) {
      console.error('Ocorreu um erro ao calcular estatísticas e validar links:', error);
    } else if (options.stats === true) {
      console.error('Ocorreu um erro ao calcular estatísticas dos links:', error);
    } else if (options.validate === true) {
      console.error('Ocorreu um erro ao validar links:', error);
    } else {
      console.error('Ocorreu um erro ao extrair links:', error);
    }
  });

module.exports = { showLinkExtraction, showLinkValidation };

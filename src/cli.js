#!/usr/bin/env node
const chalk = require('chalk');
const { mdLinks } = require('./md-links');

const filePath = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

// Função para mostrar resultados dos textos e links extraídos
function showLinkExtraction(linkResults) {
  const extractedResults = linkResults.map((link, index) => `
${chalk.hex('#FF8800')(index + 1)}. ${chalk.bold('Title:')} ${chalk.underline(link.text)}
   ${chalk.bold('URL:')} ${chalk.blue(link.url)}
   ${chalk.bold('File:')} ${chalk.green(link.file)}`);
  return extractedResults.join('\n');
}

// Função para mostrar resultado dos links válidos e inválidos
function showLinkValidation(linkResults) {
  const validationResults = linkResults.map((link, index) => {
    const status = link.ok ? chalk.green('✔') : chalk.red('✘');
    const statusText = link.ok ? chalk.green('Status: OK') : chalk.red('Status: Failed');
    const statusCode = chalk.blue(link.statusCode || 'N/A');
    return `
${chalk.hex('#FF8800')(index + 1)}. ${chalk.bold('Title:')} ${chalk.underline(link.text)}
   ${statusText} ${status}
   ${chalk.bold('HTTP Status Code:')} ${statusCode}
   ${chalk.bold('File:')} ${chalk.blue(link.file)}`;
  });
  return validationResults.join('\n');
}

// Função para mostrar resultado da estatística dos links
function showLinkStats(link) {
  return `
${chalk.bold('Estatísticas dos Links')}
${chalk.bold('═══════════════════════')}
${chalk.bold.green('Total de Links:')} ${chalk.greenBright(link.total)}
${chalk.bold.blue('Links Únicos:')} ${chalk.blueBright(link.unique)}
${chalk.bold('═══════════════════════')}`;
}

// Função para mostrar resultado da validação e estatística dos links
function showLinksValidationAndStats(link) {
  return `
${chalk.bold('Estatísticas e validação dos Links')}
${chalk.bold('═══════════════════════════════════')}
${chalk.bold.green('Total de Links:')} ${chalk.greenBright(link.total)}
${chalk.bold.blue('Links Únicos:')} ${chalk.blueBright(link.unique)}
${chalk.bold.red('Links Quebrados:')} ${chalk.redBright(link.broken)}
${chalk.bold('═══════════════════════════════════')}`;
}

// Função para tratar opções de visualizações dos links
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

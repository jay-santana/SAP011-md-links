#!/usr/bin/env node
const chalk = require('chalk');
const { extractLinks } = require('./index.js');

// const filePath = process.argv[2];

const inputs = process.argv;
const filePath = inputs[2];
console.log('caminho do arquivo', inputs);

extractLinks('./README.md')
  .then((linkResults) => {
    console.log(chalk.bgYellow(linkResults));
  })
  .catch((error) => {
    console.error('Ocorreu um erro ao extrair links:', error);
  });
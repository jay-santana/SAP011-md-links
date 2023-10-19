#!/usr/bin/env node
console.log('Oi, CLI!');

const chalk = require('chalk');
const { lerArquivo } = require('./index.js');

console.log(chalk.blue('Hello world!'));

const inputs = process.argv;
console.log(inputs);

const path = inputs[2];

lerArquivo('./README.md')
.then((conteudoArquivo) => {
  console.log(chalk.bgYellow(conteudoArquivo))
});
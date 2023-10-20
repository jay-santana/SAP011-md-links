#!/usr/bin/env node
console.log('Oi, CLI!');

const chalk = require('chalk');
const { soma } = require('./index.js');

const resultado = soma(4, 6);

console.log(chalk.blue(resultado));

console.log(chalk.blue('Hello world!'));

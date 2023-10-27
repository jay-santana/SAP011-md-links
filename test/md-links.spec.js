const { mdLinks } = require('../src/md-links');
const fs = require('fs');
const { extractLinks, validateLinks, statsLinks } = require('../src/index');

jest.mock('fs', () => {
  return {
    readFile: jest.fn()
  }
});

jest.mock('../src/index', () => {
  return {
    extractLinks: jest.fn(),
    validateLinks: jest.fn(),
    statsLinks: jest.fn()
  };
});

describe('mdLinks', () => {
  it('deve rejeitar se a extensão do arquivo não for .md', () => {
    return expect(mdLinks('arquivo.txt', {})).rejects.toThrow('Erro: A extensão do arquivo não é .md');
  });

  // it('deve resolver com os links se options.validate e options.stats forem falsos', () => {
  //   // Configurar mocks e valores de retorno
  // });

  // it('deve resolver com os links validados se options.validate for verdadeiro', () => {
  //   // Configurar mocks e valores de retorno
  // });

  // it('deve resolver com estatísticas se options.stats for verdadeiro', () => {
  //   // Configurar mocks e valores de retorno
  // });

  // it('deve resolver com estatísticas de links validados se options.validate e options.stats forem verdadeiros', () => {
  //   // Configurar mocks e valores de retorno
  // });
});



// const mdLinks = require('../src');

// console.log(mdLinks);

// describe('mdLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });
// });

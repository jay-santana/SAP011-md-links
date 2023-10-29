const { extractLinks, validateLinks, statsLinks } = require('../src/index');

describe('extractLinks', () => {
  it('deve extrair os links corretamente', () => {
    // Mock para matchAll
    const matchAllMock = jest.fn();
    String.prototype.matchAll = matchAllMock;
    // Configura o mock para retornar os resultados desejados
    matchAllMock.mockReturnValue([
      ['[link](https://example.com)', 'link', 'https://example.com'],
    ]);
    // Dados de entrada e caminho do arquivo fictício
    const data = '[link](https://example.com)';
    const filePath = '/path/to/file.md';
    // Chama a função extractLinks com seus argumentos
    extractLinks(data, filePath);
    // Verifique se a função matchAll foi chamada com os argumentos corretos
    expect(matchAllMock).toHaveBeenCalledWith(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm);
  });
});


// describe('validateLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });
// });

// describe('statsLinks', () => {
//   it('should...', () => {
//     console.log('FIX ME!');
//   });
// });

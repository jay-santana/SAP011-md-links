const { extractLinks, validateLinks, statsLinks } = require('../src/index');

global.fetch = jest.fn();

describe('extractLinks', () => {
  it('deve extrair os links corretamente', () => {
    // Mock para matchAll
    const matchAllMock = jest.fn();
    String.prototype.matchAll = matchAllMock;
    // Configura o mock para retornar os resultados desejados
    matchAllMock.mockReturnValue([
      ['[link](https://example.com)', 'link', 'https://example.com'],
    ]);
    const data = '[link](https://example.com)';
    const filePath = '/path/to/file.md';
    extractLinks(data, filePath);
    // Verifique se a função matchAll foi chamada com os argumentos corretos
    expect(matchAllMock).toHaveBeenCalledWith(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm);
  });
});

describe('validateLinks', () => {
  const links = [
    { url: 'http://example.com/page1' },
    { url: 'http://example.com/page2' },
  ];
  it('deve validar links corretamente', () => {
    // Mock das respostas do fetch
    fetch.mockResolvedValue({ status: 200 });
    return validateLinks(links).then((result) => {
      // Verifica o resultado da função
      expect(result).toEqual([
        { url: 'http://example.com/page1', statusCode: 200, ok: true },
        { url: 'http://example.com/page2', statusCode: 200, ok: true },
      ]);
      // Verifica se o fetch foi chamado com os URLs corretos
      expect(fetch).toHaveBeenCalledWith('http://example.com/page1');
      expect(fetch).toHaveBeenCalledWith('http://example.com/page2');
    });
  });
  it('deve lidar com erros de fetch', () => {
    // Mock do fetch para simular erro
    fetch.mockRejectedValue(new Error('Erro na requisição'));
    return validateLinks(links).then((result) => {
      expect(result).toEqual([
        { url: 'http://example.com/page1', ok: false },
        { url: 'http://example.com/page2', ok: false },
      ]);
    });
  });
});

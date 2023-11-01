const { extractLinks, validateLinks, statsLinks } = require('../src/index');

/* eslint-disable no-extend-native */
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
    const expectedResults = [
      { text: 'link', href: 'https://example.com', file: filePath },
    ];
    const result = extractLinks(data, filePath);
    expect(result).toEqual(expectedResults);
    // Verifique se a função matchAll foi chamada com os argumentos corretos
    expect(matchAllMock).toHaveBeenCalledWith(/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm);
  });
});
/* eslint-enable no-extend-native */

describe('validateLinks', () => {
  const links = [
    { href: 'http://example.com/page1' },
    { href: 'http://example.com/page2' },
  ];
  it('deve validar links corretamente', () => {
    global.fetch = jest.fn();
    // Mock das respostas do fetch
    fetch.mockResolvedValue({ status: 200 });
    validateLinks(links).then((result) => {
      // Verifica o resultado da função
      expect(result).toEqual([
        { href: 'http://example.com/page1', statusCode: 200, ok: true },
        { href: 'http://example.com/page2', statusCode: 200, ok: true },
      ]);
      // Verifica se o fetch foi chamado com os hrefs corretos
      expect(fetch).toHaveBeenCalledWith('http://example.com/page1');
      expect(fetch).toHaveBeenCalledWith('http://example.com/page2');
    });
  });

  it('deve lidar com erros de fetch', () => {
    // Mock do fetch para simular erro
    fetch.mockRejectedValue(new Error('Erro na requisição'));
    return validateLinks(links).then((result) => {
      expect(result).toEqual([
        { href: 'http://example.com/page1', ok: false },
        { href: 'http://example.com/page2', ok: false },
      ]);
    });
  });
});

describe('statsLinks', () => {
  const Set = jest.fn();
  const exampleLinks = [
    { href: 'https://example.com/page1', statusCode: 200 },
    { href: 'https://example.com/page2', statusCode: 404 },
    { href: 'https://example.com/page1', statusCode: 200 },
    { href: 'https://example.com/page3', statusCode: 200 },
  ];
  it('deve calcular as estatísticas corretamente', () => {
    // Mock para contar a quantidade de elementos únicos
    Set.prototype.add = jest.fn();
    Set.prototype.length = 3;
    // Mock para retornar um valor estatístico ao criar um novo conjunto
    Set.mockReturnValueOnce(new Set());
    const result = statsLinks(exampleLinks);
    // Verifica se as estatísticas são calculadas corretamente
    expect(result.total).toBe(4);
    expect(result.unique).toBe(3);
    expect(result.broken).toBe(1);
  });
});

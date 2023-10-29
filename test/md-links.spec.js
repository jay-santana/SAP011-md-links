const fs = require('fs');
const { mdLinks } = require('../src/md-links');
const { extractLinks, validateLinks, statsLinks } = require('../src/index');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

jest.mock('../src/index', () => ({
  extractLinks: jest.fn(),
  validateLinks: jest.fn(),
  statsLinks: jest.fn(),
}));

describe('mdLinks', () => {
  let data; // Variável comum para armazenar o conteúdo do arquivo
  beforeEach(() => { // Define esses valores comuns antes de cada teste
    data = '[link](https://example.com)';
    fs.promises.readFile.mockResolvedValue(data);
  });

  it('deve rejeitar se a extensão do arquivo não for .md', () => {
    expect(mdLinks('arquivo.txt', {})).rejects.toThrow('A extensão do arquivo não é .md');
  });

  it('deve resolver com os links se options.validate e options.stats forem falsos', () => {
    extractLinks.mockReturnValue(['https://example.com']);
    return expect(mdLinks('arquivo.md', {})).resolves.toEqual(['https://example.com']);
  });

  it('deve rejeitar se o arquivo não puder ser lido', () => {
    // Simula um erro ao ler o arquivo
    fs.promises.readFile.mockRejectedValue(new Error('Erro ao ler o arquivo'));
    return expect(mdLinks('arquivo.md', {})).rejects.toThrow('O arquivo não pôde ser lido');
  });

  it('deve resolver com os links validados se options.validate for verdadeiro', () => {
    const links = ['https://example.com'];
    extractLinks.mockReturnValue(links);
    // Mock para simular a validação dos links
    validateLinks.mockResolvedValue(links.map((link) => ({
      text: 'Link de exemplo',
      url: link,
      statusCode: 200,
      statusText: 'OK',
    })));
    return expect(mdLinks('arquivo.md', { validate: true })).resolves.toEqual([
      {
        text: 'Link de exemplo',
        url: 'https://example.com',
        statusCode: 200,
        statusText: 'OK',
      },
    ]);
  });
  it('deve rejeitar se o arquivo não possui links e options.validate for verdadeiro', () => {
    // Simula a função extractLinks retornando um array vazio
    extractLinks.mockReturnValue([]);
    return expect(mdLinks('arquivo.md', { validate: true })).rejects.toThrow('O arquivo não possui links');
  });

  it('deve resolver com estatísticas se options.stats for verdadeiro', () => {
    extractLinks.mockReturnValue(['https://example.com', 'https://example2.com']);
    // Mock para simular a função statsLinks
    statsLinks.mockResolvedValue({
      total: 2,
      unique: 2,
    });
    return expect(mdLinks('arquivo.md', { stats: true })).resolves.toEqual({
      total: 2,
      unique: 2,
    });
  });
  it('deve rejeitar se o arquivo não possui links e options.stats for verdadeiro', () => {
    // Mock para simular a função extractLinks retornando um array vazio
    extractLinks.mockReturnValue([]);
    return expect(mdLinks('arquivo.md', { stats: true })).rejects.toThrow('O arquivo não possui links');
  });

  it('deve resolver com estatísticas de links validados se options.validate e options.stats forem verdadeiros', () => {
    const links = ['https://example.com', 'https://example2.com'];
    extractLinks.mockReturnValue(links);
    // Mock para simular a validação dos links
    const validatedLinks = links.map((link) => ({
      text: 'Link de exemplo',
      url: link,
      statusCode: 200,
      statusText: 'OK',
    }));
    validateLinks.mockResolvedValue(validatedLinks);
    // Mock para simular a função statsLinks
    const statsResult = {
      total: 2,
      unique: 2,
    };
    statsLinks.mockResolvedValue(statsResult);
    return mdLinks('arquivo.md', { validate: true, stats: true }).then(() => {
      // Verifica se validateLinks foi chamada com os links
      expect(validateLinks).toHaveBeenCalledWith(links);
      // Verifica se statsLinks foi chamada com os links validados
      expect(statsLinks).toHaveBeenCalledWith(validatedLinks);
    });
  });

  it('deve rejeitar se o arquivo não possui links e options.validate e options.stats forem verdadeiros', () => {
    // Simula a função extractLinks retornando um array vazio
    extractLinks.mockReturnValue([]);
    return expect(mdLinks('arquivo.md', { validate: true, stats: true })).rejects.toThrow('O arquivo não possui links');
  });

  it('deve rejeitar se a validação falhar e options.validate e options.stats forem verdadeiros', () => {
    const links = ['https://example.com'];
    extractLinks.mockReturnValue(links);
    // Simula a função validateLinks rejeitando a promessa com um erro
    validateLinks.mockRejectedValue(new Error('Erro na validação de links'));
    return expect(mdLinks('arquivo.md', { validate: true, stats: true })).rejects.toThrow('Erro na validação de links');
  });
});

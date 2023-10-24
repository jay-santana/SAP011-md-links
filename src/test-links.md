<!-- O executável da nossa aplicação deve poder ser executado da seguinte maneira, através do terminal:

md-links <path-to-file> [options]

Por exemplo:

$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html algum doc
./some/example.md http://google.com/ Google -->

<!-- Teste de uso:
const links = [
{ text: 'Google', url: 'https://www.google.com' },
{ text: 'OpenAI', url: 'https://www.openai.com' },
{ text: 'Invalid Link', url: 'https://www.thisisnotarealurl1234567890.com' }
];

validateLinks(links); -->
# Markdown Links

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#2-resumo-do-projeto)
* [3. Recursos Principais](#3-recursos-principais)
* [4. Guia Prático de Instalação e Uso](#4-guia-prático-de-instalação-e-uso)
* [5. Testes Unitários](#5-testes-unitários)
* [6. Critérios Minímos de Aceitação](#6-criterios-minimos-de-aceitação)
* [7. Especificações Técnicas](#7-especificações-técnicas)
* [8. Implementações futuras](#8-implementações-futuras)
* [9. Desenvolvedora](#9-desenvolvedora)

***

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação amplamente adotada pela comunidade de programadores. Ela encontra aplicação em diversas plataformas de edição e formatação de texto, incluindo o GitHub, fóruns, e blogs. Arquivos formatados em `Markdown` são uma presença comum em qualquer repositório, sendo o `README.md` o exemplo mais representativo.

Esses documentos em `Markdown` costumam conter _links_ que podem estar quebrados, ou que já não são válidos, o que prejudica consideravelmente o valor da informação presente.

Este projeto foi desenvolvido como parte do bootcamp da Laboratória e consiste em um projeto de nível 4 de um catálogo de projetos de complexidade crescente, associados a objetivos de aprendizagem concretos. Portanto, Este projeto tem como objetivo desenvolver uma biblioteca JavaScript e uma ferramenta de linha de comando (CLI) para ler e analisar arquivos `Markdown`. Utilizando o ambiente [Node.js](https://nodejs.org/pt-br/), a biblioteca verificará os _links_  presentes nos arquivos `Markdown`, extraindo e validando esses _links_ fornecendo estatísticas relevantes.

## 2. Resumo do projeto

Md-links é uma biblioteca JavaScript que simplifica a extração de _links_ de arquivos `Markdown`, facilitando a validação de _links_ e fornecimento de estatísticas úteis. Ele é facilmente instalável via npm, tornando-se acessível aos desenvolvedores.

### Principais Características:

* Extração de Links: Md-links verifica eficientemente arquivos `Markdown` e extrai todos os _links_, economizando tempo em comparação com a extração manual.
* Validação de Links: Além da extração, valida os _links_ para garantir que estejam ativos.
* Estatísticas Detalhadas: Fornece estatísticas abrangentes sobre os _links_ encontrados nos arquivos.

### Desenvolvimento do Projeto:

Neste projeto, adquirimos conhecimentos essenciais em programação com [Node.js](https://nodejs.org/pt-br/), incluindo o entendimento de processos, interação com sistemas de arquivos, e a realização de consultas de rede. Também exploramos o potencial do [Node.js](https://nodejs.org/pt-br/) como ambiente de execução JavaScript e desenvolvemos habilidades em criar bibliotecas com uma ênfase na criação de interfaces de módulos eficazes e aderência a boas práticas de desenvolvimento.

#### Fluxograma

o fluxograma é uma ferramenta essencial que nos ajuda a planejar, acompanhar e alcançar os marcos do projeto de forma organizada e eficaz, tornando mais tangíveis os objetivos de aprendizagem estabelecidos. Dessa forma, o uso do fluxograma desempenhou um papel fundamental na estruturação e alcance dos objetivos de aprendizagem deste projeto. Ele atuou como um guia visual que nos ajudou a quebrar o projeto em pequenos passos, identificando as etapas principais do projeto. Com a ajuda do fluxograma, podemos visualizar a progressão e a conexão entre tarefas, tornando o processo de aprendizagem mais claro e gerenciável, refletindo as mudanças e ajustes necessários.

#### Fluxograma MD-Links

inserir imagem aqui!

## 3. Recursos Principais

* #### Leitura de Arquivos Markdown:

O programa recebe como entrada arquivos no formato `Markdown (.md)` a partir da linha de comando.

* #### Extração de Links:

- Extrai todos os _links_ (URLs) presentes nos arquivos `Markdown` fornecidos como entrada.

* #### Validação dos Links:

- Opção `--validate` que verifica o status HTTP de cada _link_ extraído e exibe o HTTP status code associado a cada um.

* #### Estatísticas de Links:

- Opção `--stats` para fornecer estatísticas sobre os _links_ presentes nos arquivos, incluindo o total de _links_ e a contagem de _links_ únicos (sem duplicatas).

* #### Combinação de Validação e Estatísticas:

- Opções `--validate` e `--stats` em conjunto, ao usar essa opção o programa gera estatísticas detalhadas, incluindo o número de _links_ quebrados, encontrados durante a validação, o total de _links_ e a contagem de _links_ únicos (sem duplicatas) dos dados estatísticos.

* #### Mensagens de Erro:

- Implementação de mensagens de erro para lidar com os erros de entrada ou opções inválidas.

## 4. Guia Prático de Instalação e Uso

* Este projeto deve ser feito individualmente.

* O intervalo de tempo estimado para concluir o projeto é de 4 a 5 Sprints.

* A biblioteca e script executável (ferramenta de linha de comando - CLI) devem
  ser implementados em JavaScript para serem executadas com Node.JS.
  **É permitido usar bibliotecas externas**.

* O seu módulo deve ser instalável via `npm install <github-user>/md-links`. O
  módulo deve incluir um _executável_ que pode ser chamado tanto por linha de
  comando quanto importado com `require` para ser usado em seu código.

* Os testes unitários devem cobrir no mínimo 70% dos _statements_, _functions_,
  _lines_ e _branches_. Recomendamos que explore o [Jest](https://jestjs.io/)
  para as suas provas unitárias.

* Neste projeto não é permitido utilizar `async/await`.

* Para este projeto, sugerimos que você **não use** a versão síncrona
da função de leitura de arquivo, `readFileSync`, e tente resolver esse
desafio de forma assíncrona.

* Para este projeto é opcional o uso de ES modules `(import/export)`. Caso
  você decida utilizá-lo deverá criar um script de `build` no `package.json`
  para que seja transformado em `requires` e `module.exports` com ajuda do Babel.

* Para diminuir a complexidade de seu algoritmo recursivo, recomendamos usar
a versão síncrona da função de leitura do diretórios, `readdirSync`.

## 5. Testes Unitários



## Este proyecto consta de DOS partes

### 1) JavaScript API

O módulo deve poder ser **importado** em outros scripts Node.js e deve oferecer a
seguinte interface:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Rota absoluta ou relativa ao arquivo ou diretório. Se a rota passada é
  relativa, deve resolver como sendo relativa ao diretório onde foi chamada -
  _current working directory_
* `options`: Um objeto com a seguinte propriedade:
  - `validate`: Um booleano que determina se deseja validar os links
    encontrados.
  - `stats`: Booleano que determina se deseja obter um output
    com informações estatísticas gerais.

##### Valor de retorno

A função deve **retornar uma promessa** (`Promise`) que
**resolve um array** (`Array`) e
objetos(`Object`), onde cada objeto representa um link, contendo as seguintes
propriedades:

Com `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que irá aparecer dentro de um link (`<a>`).
* `file`: Rota do arquivo onde foi encontrado o link.

Com `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de resposta HTTP.
* `ok`: Mensagem `fail` em caso de falha ou `ok` em caso de sucesso.

#### Exemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interface de Linha de Comando)

O executável da nossa aplicação deve poder ser executado da seguinte maneira,
através do **terminal**:

`md-links <path-to-file> [options]`

Por exemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html algum doc
./some/example.md http://google.com/ Google
```

O comportamento padrão não deve validar se as URLs respondem ok ou não, somente
deve identificar o arquivo Markdown (a partir da rota que recebeu como
argumento), analisar o arquivo Markdown e imprimir os links que vão sendo
encontrados, junto com a rota do arquivo onde aparece e o texto encontrado
dentro do link (truncado 50 caracteres).

#### Options

##### `--validate`

Se passamos a opção `--validate`, o módulo deve fazer uma requisição HTTP para
verificar se o link funciona ou não. Se o link resultar em um redirecionamento a
uma URL que responde ok, então consideraremos o link como ok.

Por exemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que o _output_ neste caso inclui a palavra `ok` e `fail` depois da URL,
assim como o status da resposta recebida à requisição HTTP feita pela URL.

##### `--stats`

Se passamos a opção `--stats` o output (saída) será um texto com estatísticas
básicas sobre os links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Também podemos combinar `--stats` e `--validate` para obter estatísticas que
necessitem dos resultados da validação.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 6. Critérios Minímos de Aceitação

O módulo deve ser instalável via `npm install <github-user>/md-links`. Este
módulo deve incluir **um executável** que pode ser chamado tanto por linha de
comando, como também possa ser importado com `require` para usá-lo no seu código.

## 7. Especificações Técnicas



***

## 8. Implementações futuras

## 9. Desenvolvedora

## 9. Checklist

### General

* [ ] Poder instalar via `npm install --global <github-user>/md-links`

### `README.md`

* [ ] Um board com o backlog das implementações da sua biblioteca
* [ ] Documentação técnica da sua biblioteca
* [ ] Guia de uso e instalação da biblioteca

### API `mdLinks(path, opts)`

* [ ] O módulo exporta uma função com a interface (API) esperada
* [ ] Implementa suporte para arquivo individual
* [ ] Implementa suporte para diretórios
* [ ] Implementa `options.validate`

### CLI

* [ ] Possuir o executável `md-links` no path (configurado no `package.json`)
* [ ] Executar sem erros e ter o resultado esperado
* [ ] Implementar `--validate`
* [ ] Implementar `--stats`

### Testes

* [ ] Os testes unitários devem cobrir no mínimo 70% dos statements, functions,
  lines e branches.
* [ ] Rodar os testes e linter (`npm test`).

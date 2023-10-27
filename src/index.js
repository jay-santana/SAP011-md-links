// Função para extrair links
function extractLinks(data, filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const getFileLinks = [...data.matchAll(regex)];
  const linkResults = getFileLinks.map((link) => ({
    text: link[1],
    url: link[2],
    file: filePath,
  }));
  return linkResults;
}

// Função para validar links
function validateLinks(getFileLinks) {
  return Promise.all(
    getFileLinks.map((link) => fetch(link.url)
      .then((response) => ({
        ...link,
        statusCode: response.status,
        ok: response.status >= 200 && response.status < 400,
      }))
      .catch(() => ({
        ...link,
        ok: false,
      }))),
  );
}

// Função para estatísticas dos links
function statsLinks(allLinks) {
  const totalFileLinks = allLinks.length;
  const uniqueLinks = [...new Set(allLinks.map((link) => link.url))].length;
  const brokenLinks = allLinks.filter((link) => link.status !== 200).length;
  return {
    total: totalFileLinks,
    unique: uniqueLinks,
    broken: brokenLinks,
  };
}

module.exports = { extractLinks, validateLinks, statsLinks };

// Leitura do aquivo
// Extração dos links e textos
// Validação dos links (válidos e inválidos)
// Estatísticas dos links (total de links, links únicos e links quebrados)

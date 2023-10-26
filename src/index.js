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
    getFileLinks.map((link) => {
      return fetch(link.url)
        .then((response) => ({
          ...link,
          valid: response.status >= 200 && response.status < 400,
        }))
        .catch(() => ({
          ...link,
          valid: false,
        }));
    }),
  );
}

// Função para estatísticas dos links
function statsLinks(linkResults) {
  const totalFileLinks = linkResults.length;
  const uniqueLinks = [...new Set(linkResults.map((link) => link.url))].length;
  const brokenLinks = linkResults.filter((link) => link.status !== 200).length;
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

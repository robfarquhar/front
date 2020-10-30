// import path from 'path';
const path = require('path');

async function turnFilmsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const filmTemplate = path.resolve('./src/templates/Film.js');
  // 2. Query all films
  const { data } = await graphql(`
    query {
      films: allSanityFilm {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each film and create a page for that film
  data.films.nodes.forEach(film => {
    actions.createPage({
      // What is the URL for this new page??
      path: `film/${film.slug.current}`,
      component: filmTemplate,
      context: {
        slug: film.slug.current,
      },
    });
  });
}

// Async/await
exports.createPages = async params => {
  // do async work
  await turnFilmsIntoPages(params);
};

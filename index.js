// const { env } = require("jsdom");
// const fetch = require("isomorphic-fetch");
const { parse } = require('url');
const scrapper = require('./libs/scrapper.js');

const EXAMPLE_URL = `https://mimicroservicio.papa/?username=some-username`;

module.exports = async request => {
  const { query } = parse(request.url, true);

  if (!query.username) {
    const error = new ReferenceError(`You must query for a specific username using a URL like ${EXAMPLE_URL}`);

    error.statusCode = 400;
    throw error;
  }

  return await scrapper(query.username);
};

const { env } = require("jsdom");
const fetch = require("isomorphic-fetch");

function getJSDom(html) {
  return new Promise((resolve, reject) => {
    env(html, [], (error, window) => {
      if (error) return reject(error);
      return resolve(window);
    });
  });
}

async function scrapper(username) {
  const url = `https://platzi.com/@${username}`;
  const response = await fetch(url);
  const html = await response.text();
  const window = await getJSDom(html);
  const { document } = window;
  const name = document.querySelector('.ProfileHeader-name').innerHTML;
  const description = document.querySelector('.ProfileHeader-description').innerHTML;
  const courses = Array
  .from(document.querySelectorAll('.Courses'))
  .map(courses$ => {
    const title = courses$.querySelector('.Course-title').childNodes[1].data;
    const career = courses$.querySelector('.Course-career').innerHTML;
    const percentage = courses$.querySelector('.Course-percentage').childNodes[1].data;
    const badgeUrl = courses$.querySelector('.Courses-badge > img').getAttribute('src');

    return { title, career, percentage, badgeUrl };
  });

  return {
    url,
    user: {
      username,
      name,
      description
    },
    courses
  };
}

module.exports = scrapper;
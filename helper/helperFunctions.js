import cheerio from 'cheerio';
import axios from 'axios';
import cloudflareScraper from 'cloudflare-scraper';


const fetch_retry = async (url, n) => {
  try {
    return await fetch(url, {
      credentials: "same-origin",
      mode: 'cors'
    })
      .then(response => response.text())
      .then(data => { return data; });
  } catch (err) {
    if (n === 1) return err;
    return await fetch_retry(url, n - 1);
  }
};

const fetchNews = async (url) => await fetch(url)
  .then(response => response.text())
  .then(data => { return data; })
  .catch(error => console.log(error));

// export async function getNews() {
//   const apikey = process.env.NEWS_API_KEY;
//   let url = new URL('https://api.newscatcherapi.com/v2/search');
//   let params = { q: '"next.js" OR "next js" OR javascript', lang: 'en', sort_by: 'relevancy', page: '1' };
//   url.search = new URLSearchParams(params).toString();

//   let options = {
//     method: 'GET',
//     headers: {
//       'x-api-key': apikey
//     },
//   };

//   const response = await fetch_retry(url, options, 3)
//     .then(response => response.json())
//     .then(data => { return data.articles; });
//   return response;
// }

export async function getN1News() {

  const url = `https://ba.n1info.com/feed/`;
  const html = await fetch_retry(url, 5);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('img').text();
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    const category = $(element).find('category').first().text();

    response.push({ title, link, media, category });
  });

  return response.slice(0, 8);
}

export async function getKlixNews() {

  const url = `https://www.klix.ba/rss`;
  const html = await fetch_retry(url, 5);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('media\\:content').attr('url');
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    const category = $(element).find('category').text();

    response.push({ title, link, media, category });
  });

  return response.slice(0, 8);
}

export async function getVecernjiListNews() {

  const url = `https://www.vecernji.ba/feeds/latest`;
  const html = await fetch_retry(url, 5);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('enclosure').attr('url');
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    // const category = $(element).find('category').text();

    response.push({ title, link, media });
  });

  return response.slice(0, 8);
}


export async function getOslobodjenjeNews() {

  const url = `https://www.oslobodjenje.ba/feed`;
  const html = await fetch_retry(url, 1);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('enclosure').attr('url');
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    const category = $(element).find('category').text();

    response.push({ title, link, media, category });
  });

  return response.slice(0, 8);
}

export async function getOslobodjenjeNews1() {

  const url = `https://www.oslobodjenje.ba/feed`;
  const html = await cloudflareScraper.get(url);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('enclosure').attr('url');
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    const category = $(element).find('category').text();

    response.push({ title, link, media, category });
  });

  return response.slice(0, 8);
}

export async function getKlixNews1() {

  const url = `https://www.klix.ba/rss`;
  const html = await cloudflareScraper.get(url);
  let response = [];
  const $ = cheerio.load(html, { xmlMode: true });
  $('item').each((i, element) => {
    const media = $(element).find('media\\:content').attr('url');
    const link = $(element).find('link').text();
    const title = $(element).find('title').text();
    const category = $(element).find('category').text();

    response.push({ title, link, media, category });
  });

  // return response.slice(0, 8);
  return response.slice(0, 8);
}

import cheerio from 'cheerio';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';


const fetch_retry = async ( url, n, options ) => {
  try {
    return await fetch( url, options )
      .then( response => response.text() )
      .then( data => { return data; } );
  } catch ( err ) {
    if ( n === 1 ) return err;
    return await fetch_retry( url, n - 1 );
  }
};

const fetchNews = async ( url ) => await fetch( url )
  .then( response => response.json() )
  .then( data => { return data; } )
  .catch( error => console.log( error ) );

export async function getNews() {
  const apikey = process.env.NEWS_API_KEY;
  let url = new URL( 'https://api.newscatcherapi.com/v2/search' );
  let params = { q: '"next.js" OR "next js" OR javascript', lang: 'en', sort_by: 'relevancy', page: '1' };
  url.search = new URLSearchParams( params ).toString();

  let options = {
    method: 'GET',
    headers: {
      'x-api-key': apikey
    },
  };

  const response = await fetch_retry( url, 3, options );

  return response;
}

export async function getAvaz() {

  let url = 'https://avaz.ba/najnovije';
  let result = [];

  const html = await fetch_retry( url, 3 );

  const $ = cheerio.load( html );
  $( '.top-article-four' ).each( ( i, element ) => {
    const media = `https://avaz.ba${$( element ).find( 'img' ).first().attr( 'src' )}`;
    const link = $( element ).find( 'a' ).first().attr( 'href' );
    const title = $( element ).find( '.category-list-link' ).text();
    // const category = $(element).find('.markica').text();

    result.push( { title, link, media } );


  } );
  return result.slice( 0, 10 );
}

export async function getKlix() {

  let url = 'https://www.klix.ba/vijesti';
  let result = [];
  try {
    const html = await fetch_retry( url, 3 );
    // const jar = new CookieJar();
    // const axiosInstance = wrapper(axios.create({
    //   // baseURL: 'https://klix.ba/',
    //   // Accept: 'text/ html, application / xhtml + xml, application / xml; q = 0.9, image / webp, image / apng,*;/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //   // 'Accept-Encoding': 'gzip, deflate, br',
    //   // Connection: 'keep-alive',
    //   // Host: 'klix.ba',
    //   // withCredentials: true,
    //   jar
    // }));
    // axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";
    // axiosInstance.defaults.xsrfCookieName = 'csrftoken';

    // const html = await axiosInstance.get(url, {}).then(response => { return response; });

    // console.log( html );

    const $ = cheerio.load( html );
    $( 'article.relative' ).each( ( i, element ) => {
      let media = $( element ).find( 'img' ).first().attr( 'src' );
      if ( media.includes( 'data:image' ) ) {
        media = $( element ).find( 'img' ).first().attr( 'data-srcset' );
      }
      const link = `https://avaz.ba${$( element ).find( 'a' ).first().attr( 'href' )}`;
      const title = $( element ).find( 'h2' ).text();
      // const category = $(element).find('.markica').text();
      console.log( title );

      result.push( { title, link, media } );
    } );
    return result.slice( 0, 10 );
  } catch ( error ) {
    console.log( error );
    return error.response;
  }


}


export async function getN1News() {

  const url = `https://ba.n1info.com/feed/`;
  let html = await fetch_retry( url, 5 );
  html = html.replace( /<!\[CDATA\[([\s\S]*?)\]\]>(?=\s*<)/gi, "$1" );

  let response = [];
  const $ = cheerio.load( html, { xmlMode: true } );
  $( 'item' ).each( ( i, element ) => {
    const media = $( element ).find( 'img' ).attr( 'src' );
    const link = $( element ).find( 'link' ).text();
    const title = $( element ).find( 'title' ).text();
    const category = $( element ).find( 'category' ).first().text();
    response.push( { title, link, media, category } );
  } );

  return response.slice( 0, 10 );
}

export async function getKlixNews() {

  const url = `https://www.klix.ba/rss`;
  const html = await fetch_retry( url, 5 );
  let response = [];
  const $ = cheerio.load( html, { xmlMode: true } );
  $( 'item' ).each( ( i, element ) => {
    const media = $( element ).find( 'media\\:content' ).attr( 'url' );
    const link = $( element ).find( 'link' ).text();
    const title = $( element ).find( 'title' ).text();
    const category = $( element ).find( 'category' ).text();

    response.push( { title, link, media, category } );
  } );

  return response.slice( 0, 10 );
}

export async function getVecernjiListNews() {

  const url = `https://www.vecernji.ba/feeds/latest`;
  const html = await fetch_retry( url, 5 );
  let response = [];
  const $ = cheerio.load( html, { xmlMode: true } );
  $( 'item' ).each( ( i, element ) => {
    const media = $( element ).find( 'enclosure' ).attr( 'url' );
    const link = $( element ).find( 'link' ).text();
    const title = $( element ).find( 'title' ).text();
    // const category = $(element).find('category').text();

    response.push( { title, link, media } );
  } );

  return response.slice( 0, 10 );
}


export async function getOslobodjenjeNews() {

  const url = `https://www.oslobodjenje.ba/feed`;
  const html = await fetch_retry( url, 1 );
  let response = [];
  const $ = cheerio.load( html, { xmlMode: true } );
  $( 'item' ).each( ( i, element ) => {
    const media = $( element ).find( 'enclosure' ).attr( 'url' );
    const link = $( element ).find( 'link' ).text();
    const title = $( element ).find( 'title' ).text();
    const category = $( element ).find( 'category' ).text();

    response.push( { title, link, media, category } );
  } );

  return response.slice( 0, 10 );
}

export async function getAljazeeraNews() {

  const url = `https://balkans.aljazeera.net/rss.xml`;
  const html = await fetch_retry( url, 1 );
  let response = [];
  const $ = cheerio.load( html, { xmlMode: true } );
  $( 'item' ).each( ( i, element ) => {
    const media = $( element ).find( 'enclosure' ).attr( 'url' );
    const link = $( element ).find( 'link' ).text();
    const title = $( element ).find( 'title' ).text();
    const category = $( element ).find( 'category' ).text();

    response.push( { title, link, media, category } );
  } );

  return response.slice( 0, 10 );
}


export async function getIndexBa() {
  const url = 'https://index.ba/wp-json/wp/v2/posts';
  const response = await fetchNews( url );
  // const result = response.json();
  let result = [];
  response.map( post => {
    const media = post.yoast_head_json.og_image[ 0 ].url;
    const link = post.link;
    const title = post.title.rendered;
    result.push( { title, link, media } );
  } );
  return result.slice( 0, 10 );
}

// info.ba endpoint za novosti https://index.ba/wp-json/wp/v2/posts

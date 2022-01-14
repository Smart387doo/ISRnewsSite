import axios from "axios";

export async function getNews(params) {
  const apikey = process.env.NEWS_API_KEY;
  let result = [];
  var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: { q: 'next.js OR nextjs OR "next js" OR javascript', lang: 'en', sort_by: 'relevancy', page: '1' },
    headers: {
      'x-api-key': apikey
    }
  };

  await axios.request(options).then(function (response) {
    console.log(response.data);
    result = response.data.articles;
  }).catch(function (error) {
    console.error(error);
  });
  return result;
}

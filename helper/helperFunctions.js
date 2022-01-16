export async function getNews() {
  const apikey = process.env.NEWS_API_KEY;
  var url = new URL('https://api.newscatcherapi.com/v2/search');
  var params = { q: '"next.js" OR "nextjs" OR "next js" OR javascript', lang: 'en', sort_by: 'relevancy', page: '1' };
  url.search = new URLSearchParams(params).toString();

  var options = {
    method: 'GET',
    headers: {
      'x-api-key': apikey
    },
  };

  const fetch_retry = async (url, options, n) => {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (n === 1) throw err;
      return await fetch_retry(url, options, n - 1);
    }
  };
  const response = await fetch_retry(url, options, 3)
    .then(response => response.json())
    .then(data => { return data.articles; });;
  return response;
}

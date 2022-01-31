
import axios from "axios";
import cheerio from "cheerio";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

export default async function handler(req, res) {
  const jar = new CookieJar();
  const url = "https://manager.zona.ba/api/login";
  const axiosInstance = wrapper(axios.create({
    baseURL: 'https://manager.zona.ba/',
    Accept: 'text/ html, application / xhtml + xml, application / xml; q = 0.9, image / webp, image / apng,*;/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Host: 'manager.zona.ba',
    withCredentials: true,
    jar
  }));



  // axiosInstance.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
  // axiosInstance.defaults.xsrfCookieName = "csrftoken";
  const username = "smart";
  const password = "smartdoo";


  const getToken = await axiosInstance.get(url, {},
    //   {
    //   auth: {
    //     username: username,
    //     password: password
    //   }
    // }
  )
    .then(response => {
      const $ = cheerio.load(response.data);
      const token = $("form > input").attr("value");
      return token;
    })
    .catch(error => { return error.response.data; });


  if (getToken) {
    const users = await axiosInstance(url, {
      _token: getToken,
      stUser: 'smart',
      password: 'smartdoo',
      LNG: 'BIH',
      button: ''
    },
      {
        method: 'POST',
        // headers: {
        //   'X-CSRF-TOKEN': getToken
        // },
        // auth: {
        //   username: username,
        //   password: password
        // },
      },
    )
      .catch(error => { console.log(error); return error.response.data; });
    console.log(getToken);
    // console.log(users);
    let [cookie] = users.headers["set-cookie"];
    // axiosInstance.defaults.headers['XSRF-TOKEN'] = cookie[1].toString().split(';')[0].replace('XSRF-TOKEN=', ''); // attaching cookie to axiosInstance for future requests
    // axiosInstance.defaults.headers['Cookie'] = cookie.toString();

    if (cookie) {
      console.log('cookie', cookie[1].toString().split(';')[0].replace('XSRF-TOKEN=', ''), 'kraj cookie');

      axiosInstance.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2));
        return request;
      });

      await axiosInstance('https://manager.zona.ba/api/web/clients', {
        headers: { Cookie: cookie }
      })
        .then(response => {
          console.log(response);
          return response;
          //res.status(200).json(response.data);
        })
        .catch(error => console.log('greška', error.response.status));
    }

  }

}

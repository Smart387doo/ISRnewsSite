import { useState, useEffect } from "react";
import useSWR from "swr";
import NewsCard from "../components/NewsCard";
import { getKlixNews, getN1News, getNews, getOslobodjenjeNews, getVecernjiListNews } from "../helper/helperFunctions";

const fetcher = (...args) => fetch(...args).then(res => res.json());
export default function Home(props) {
  const [n1, setN1] = useState(props.n1);
  const [klix, setKlix] = useState(props.klix);
  const [vecernji, setVecernji] = useState(props.vecernji);
  const [oslobodjenje, setOslobodjenje] = useState(props.oslobodjenje);

  const { data, error } = useSWR('/api/news', fetcher, { refreshInterval: 10000 });

  useEffect(() => {
    console.log(data);
    if (data) {
      setN1(data.n1);
      setKlix(data.klix);
      setOslobodjenje(data.oslobodjenje);
      setVecernji(data.vecernji);
    }

  }, [data]);


  return (
    <>
      <h3 className="my-8 text-2xl font-semibold underline decoration-rose-700">
        N1 info
      </h3>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-4 lg:gap-6 md:grid-cols-2">
        {n1.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      <h3 className="my-8 text-2xl font-semibold underline decoration-rose-700">
        Klix
      </h3>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-4 lg:gap-6 md:grid-cols-2">
        {klix.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      <h3 className="my-8 text-2xl font-semibold underline decoration-rose-700">
        Večernji list
      </h3>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-4 lg:gap-6 md:grid-cols-2">
        {vecernji.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      <h3 className="my-8 text-2xl font-semibold underline decoration-rose-700">
        Oslobođenje
      </h3>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-4 lg:gap-6 md:grid-cols-2">
        {oslobodjenje.map(news => <NewsCard key={news.title} news={news} />)}
      </div>
    </>
  );
}

export const getStaticProps = async () => {

  // const result = await getNews();
  const n1News = await getN1News();
  const klixNews = await getKlixNews();
  const vecernjiNews = await getVecernjiListNews();
  const oslobodjenjeNews = await getOslobodjenjeNews();

  // if (!result || result === []) {
  //   return {
  //     revalidate: 10
  //   };
  // }

  return {
    props: {
      n1: n1News,
      klix: klixNews,
      vecernji: vecernjiNews,
      oslobodjenje: oslobodjenjeNews
    },
    revalidate: 30
  };
};

import { useState, useEffect } from "react";
import useSWR from "swr";
import NewsCard from "../components/NewsCard";
import { getAvaz, getIndexBa, getKlix, getN1News, getOslobodjenjeNews, getVecernjiListNews } from "../helper/helperFunctions";

const fetcher = (...args) => fetch(...args).then(res => res.json());


export default function Home(props) {


  const [n1, setN1] = useState(props.n1);
  const [klix, setKlix] = useState(props.klix);
  const [vecernji, setVecernji] = useState(props.vecernji);
  // const [oslobodjenje, setOslobodjenje] = useState(props.oslobodjenje);
  const [indexBa, setIndexBa] = useState(props.indexBa);
  const [avaz, setAvaz] = useState(props.avaz);

  const { data, error } = useSWR('/api/news', fetcher, { refreshInterval: 10000 });

  useEffect(() => {
    if (data) {
      setN1(data.n1);
      setKlix(data.klix);
      setAvaz(data.avaz);
      // setOslobodjenje(data.oslobodjenje);
      setVecernji(data.vecernji);
      setIndexBa(data.indexBa);
    }

  }, [data]);


  return (
    <>
      <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        N1 info
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {n1.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      {/* <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        Klix
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {klix.map(news => <NewsCard key={news.title} news={news} />)}
      </div> */}

      <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        Večernji list
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {vecernji.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        Index.ba
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {indexBa.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        avaz.ba
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {avaz.map(news => <NewsCard key={news.title} news={news} />)}
      </div>

      {/* <h1 className="p-4 my-4 text-3xl font-semibold text-center underline rounded-md shadow bg-slate-100 decoration-rose-700">
        Oslobođenje
      </h1>
      <div className="grid mt-6 space-y-12 lg:space-y-0 lg:grid-cols-5 lg:gap-6 md:grid-cols-2">
        {oslobodjenje.map(news => <NewsCard key={news.title} news={news} />)}
      </div> */}
    </>
  );
}

export const getStaticProps = async () => {

  // const result = await getNews();
  const n1News = await getN1News();
  const klixNews = await getKlix();
  const vecernjiNews = await getVecernjiListNews();
  // const oslobodjenjeNews = await getOslobodjenjeNews();
  const indexBa = await getIndexBa();
  const avaz = await getAvaz();

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
      // oslobodjenje: oslobodjenjeNews
      indexBa: indexBa,
      avaz: avaz
    },
    revalidate: 30
  };
};

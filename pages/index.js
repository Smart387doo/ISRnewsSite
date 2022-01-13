import NewsCard from "../components/NewsCard";
import { getNews } from "../helper/helperFunctions";

export default function Home({ allNews }) {
  return (
    <>
      <h1 className="my-16 text-6xl font-semibold text-center">
        Latest news about next.js, javascript and react
      </h1>
      <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
        {allNews.map(news => <NewsCard key={news._id} news={news} />)}
      </div>
    </>
  );
}

export const getStaticProps = async () => {

  const result = await getNews();

  return {
    props: {
      allNews: result
    },
    revalidate: 3600
  };
};

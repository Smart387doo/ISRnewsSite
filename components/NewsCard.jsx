import Image from "next/image";

const NewsCard = ({ news }) => {
  return (
    <>
      {news.title && news.media && (
        <div className="relative h-full mb-8 shadow-lg group">
          <div className="relative w-full px-2 overflow-hidden bg-white rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1">
            <Image
              src={`/api/imageproxy?url=${encodeURIComponent(news.media)}`}
              width={600}
              height={400}
              alt={news.title}
              objectFit="cover"
              className="object-center w-full h-full"
            />
            {news.category && <span className="absolute px-2 py-1 font-semibold rounded-md text-slate-200 bottom-3 left-5 bg-slate-500">{news.category}</span>}
          </div>
          <div className="px-4">
            <h2 className="mt-6 mb-4 text-lg font-semibold text-gray-900">
              <a href={news.link} target="_blank" rel="noreferrer">
                <span className="absolute inset-0" />
                {news.title}
              </a>
            </h2>
            <p className="text-base text-gray-700">{news.excerpt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;

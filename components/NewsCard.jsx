const NewsCard = ({ news }) => {
  return (
    <>
      {news.title && news.media && news.excerpt && (
        <div className="relative group">
          <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
            <img
              src={news.media}
              alt={news.title}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <h2 className="mt-6 mb-4 text-lg font-semibold text-gray-900">
            <a href={news.link}>
              <span className="absolute inset-0" />
              {news.title}
            </a>
          </h2>
          <p className="text-base text-gray-700">{news.excerpt}</p>
        </div>
      )}
    </>
  );
};

export default NewsCard;

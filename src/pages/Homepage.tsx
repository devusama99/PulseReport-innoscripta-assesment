import { Carousel, ConfigProvider, Spin } from "antd";
import HeaderCard from "../components/HeaderCard";

import NewsCard from "../components/NewsCard";
import { slidesToShow } from "../helpers/slidesToShow";
import RecommendedCard from "../components/RecommendedCard";
import { useEffect, useState } from "react";
import {
  ForYouNews,
  LatestNews,
  PopularNews,
  TopStoryNews,
} from "../types/types";
import { getNewsFeed } from "../apis/api";

const HomePage = () => {
  const [latestNews, setLatestNews] = useState<LatestNews[]>([]);
  const [mostpopular, setMostPopular] = useState<PopularNews[]>([]);
  const [topStories, setTopStories] = useState<TopStoryNews[]>([]);
  const [forYou, setForYou] = useState<ForYouNews[]>([]);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true);

  const loadingIntial = async () => {
    const response: any = await getNewsFeed();
    if (response[0].length) setTopStories(response[0]);
    if (response[1].length) setLatestNews(response[1]);
    if (response[2].length) setMostPopular(response[2]);
    if (response[3].length) setForYou(response[3]);

    setLoadingFeed(false);
  };

  useEffect(() => {
    loadingIntial();
  }, []);
  return (
    <div className="max-w-[1280px] mx-auto">
      {loadingFeed ? (
        <Spin spinning={true} fullscreen />
      ) : (
        <div className="grid grid-cols-12 md:gap-10">
          <div className="col-span-12 lg:col-span-9 ">
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    dotOffset: -30,
                  },
                },
              }}
            >
              <Carousel
                infinite
                autoplay
                autoplaySpeed={5000}
                pauseOnHover
                pauseOnFocus
              >
                {topStories.map((article) => (
                  <HeaderCard
                    title={article.title}
                    url={article.url}
                    category={article.category}
                    updateAt={article.updateAt}
                    description={article.description}
                    image={article.image}
                  />
                ))}
              </Carousel>
            </ConfigProvider>
            {/* Latest News Section */}
            {latestNews.length ? (
              <div>
                <div className="mt-10">
                  <h4 className="section-heading">
                    <span className="section-heading-underline">Latest</span>
                    News
                  </h4>
                </div>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Carousel: {
                          arrowOffset: -20,
                        },
                      },
                    }}
                  >
                    <Carousel
                      className="mt-5"
                      slidesToShow={slidesToShow()}
                      arrows={true}
                      dots={false}
                      draggable
                      swipeToSlide
                      infinite={false}
                    >
                      {latestNews.map((article: LatestNews) => (
                        <NewsCard
                          title={article.title}
                          description={article.description}
                          url={article.url}
                          image={article.urlToImage}
                          author={article.source.name}
                          updatedAt={article.publishedAt}
                          category={article.author}
                        />
                      ))}
                    </Carousel>
                  </ConfigProvider>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Most Popular Articles */}
            {mostpopular.length ? (
              <div className="mt-5 md:mt-10">
                <div className=" flex justify-between items-center">
                  <h4 className="section-heading">
                    <span className="section-heading-underline">Most</span>
                    Popular
                  </h4>
                </div>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Carousel: {
                          arrowOffset: -20,
                        },
                      },
                    }}
                  >
                    <Carousel
                      className="mt-5"
                      slidesToShow={slidesToShow()}
                      arrows={true}
                      dots={false}
                      draggable
                      swipeToSlide
                      infinite={false}
                    >
                      {mostpopular.map((article: PopularNews) => (
                        <NewsCard
                          key={article.id}
                          image={article.image ? article.image : ""}
                          title={article.title}
                          description={article.description}
                          author={article.source}
                          url={article.url}
                          updatedAt={article.updatedAt}
                        />
                      ))}
                    </Carousel>
                  </ConfigProvider>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="col-span-12 md:col-span-3 mt-4 md:mt-0 md:ps-5 "
            style={{ borderLeft: "1px solid #E9E8E9" }}
          >
            {forYou.length ? (
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="section-heading">
                    <span className="section-heading-underline">For</span>
                    You
                  </h4>
                </div>
                <div className="flex flex-col gap-1 mt-5">
                  {forYou.map((article: ForYouNews) => (
                    <RecommendedCard
                      url={article.url}
                      title={article.title}
                      description={article.description}
                      updatedAt={article.updatedAt}
                      urlToImage={article.urlToImage}
                      author={article.author}
                    />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

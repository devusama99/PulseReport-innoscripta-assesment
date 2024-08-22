import axios from "axios";
import { Source } from "../types/types";

export const getCategorySources = async (category: string) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_NEWSAPI_URL,
      url: "/v2/top-headlines/sources",
      params: {
        apiKey: import.meta.env.VITE_NEWSAPI_KEY,
        category,
      },
    });
    if (response.data.sources.length > 5) {
      return response.data.sources.slice(0, 5);
    } else return response.data.sources;
  } catch (e) {
    console.error("Error fetchign sources for " + category, e);
  }
};

export const getCategoriesSources = async (categories: string[]) => {
  try {
    const requests = categories.map((category) => getCategorySources(category));
    const responses = await Promise.all(requests);
    return responses;
  } catch (e) {
    console.error("Error fetching sources for categories:", e);
  }
};

export const getLatestNews = async (page: number, pageSize: number) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_NEWSAPI_URL,
      url: "/v2/everything",
      params: {
        apiKey: import.meta.env.VITE_NEWSAPI_KEY,
        page,
        pageSize,
        language: "en",
        domains: "bbc.co.uk,",
      },
    });
    if (response.data.articles.length) {
      const validArticles = response.data.articles.filter(
        (article: any) => article.author && !article.title.includes("Removed")
      );
      if (validArticles.length > 10) return validArticles.slice(0, 10);
      else return validArticles;
    } else return [];
  } catch (e) {
    console.error("Error fetching latest News", e);
    return e;
  }
};

export const getMostPopularNews = async (days: number) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_NYT_URL,
      url: `mostpopular/v2/viewed/${days}.json`,
      headers: {
        Accept: "application/json",
      },
      params: {
        "api-key": import.meta.env.VITE_NYT_KEY,
      },
    });

    if (response.data.results.length) {
      const formatedData = response.data.results
        .map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            url: item.url,
            updateAt: item.updated,
            source: item.source,
            description: item.abstract,
            image: item.media[0]
              ? item.media[0]["media-metadata"][1].url
              : null,
            category: item.nytdsection,
          };
        })
        .filter((item: any) => item.image);

      if (formatedData.length > 10) return formatedData.slice(0, 10);
      else return formatedData;
    } else return [];
  } catch (e) {
    console.error("Error fetching Popular News", e);
    return e;
  }
};

export const getTopStories = async (section: string) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_NYT_URL,
      url: `/topstories/v2/${section}.json`,
      headers: {
        Accept: "application/json",
      },
      params: {
        "api-key": import.meta.env.VITE_NYT_KEY,
      },
    });

    console.log(response.data.results);

    if (response.data.results.length) {
      const formatedData = response.data.results.map((item: any) => {
        return {
          title: item.title,
          url: item.url,
          updateAt: item["updated_date"],
          description: item.abstract,
          image: item.multimedia ? item.multimedia[0].url : null,
          category: item["des_facet"][item["des_facet"].length - 1],
        };
      });

      if (formatedData.length > 5) return formatedData.slice(0, 5);
      else return formatedData;
    } else return [];
  } catch (e) {
    console.error("Error fetching Popular News", e);
    return e;
  }
};

export const getForYouNews = async (page: number, pageSize: number) => {
  let sources = localStorage.getItem("sources");
  let mysources: Source[] = sources?.length ? JSON.parse(sources) : null;
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_NEWSAPI_URL,
      url: "/v2/everything",
      params: {
        apiKey: import.meta.env.VITE_NEWSAPI_KEY,
        page,
        pageSize,
        sources: mysources?.length
          ? mysources.map((item: Source) => item.id)
          : "",
      },
    });
    if (response.data.articles.length) {
      const validArticles = response.data.articles.filter(
        (article: any) => article.author && !article.title.includes("Removed")
      );

      const formatedArticles = validArticles.map((article: any) => ({
        author: article.author,
        title: article.title,
        url: article.url,
        updateAt: article.updatedAt,
        description: article.description,
        image: article.urlToImage,
      }));
      if (formatedArticles.length > 10) return formatedArticles.slice(0, 10);
      else return formatedArticles;
    } else return [];
  } catch (e) {
    console.error("Error fetching latest News", e);
    return e;
  }
};

export const getNewsFeed = async () => {
  try {
    const response = await Promise.all([
      getTopStories("world"),
      getLatestNews(1, 30),
      getMostPopularNews(1),
      getForYouNews(1, 30),
    ]);
    console.log(response);
    return response;
  } catch (e) {
    console.log("Error Getting NewsFeed!", e);
    return e;
  }
};

export const searchArticle = async (
  query: string | null,
  page: number,
  pageSize: number,
  sortBy?: string,
  from?: string,
  to?: string
) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: import.meta.env.VITE_GUARDIAN_URL,
      url: "/search",
      params: {
        "api-key": import.meta.env.VITE_GUARDIAN_KEY,
        q: query,
        page,
        "page-size": pageSize,
        "from-date": from,
        "to-date": to,
        "order-by": sortBy,
        "show-fields": "all",
      },
    });
    return {
      total: response.data.response.total,
      currentPage: response.data.response.currentPage,
      data: response.data.response.results?.map((article: any) => ({
        url: article.webUrl,
        title: article.fields.headline,
        description: article.fields.bodyText.split(" ").slice(0, 20).join(" "),
        author: article.fields.publication,
        category: article.sectionName,
        updatedAt: article.webPublicationDate,
        image: article.fields.thumbnail,
        id: article.id,
      })),
    };
  } catch (e) {
    console.error("Error fetching latest News", e);
    return e;
  }
};

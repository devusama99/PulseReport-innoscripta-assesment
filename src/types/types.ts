export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface LatestNews {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface PopularNews {
  id: number;
  title: string;
  url: string;
  updatedAt: string;
  source: string;
  description: string;
  image: string | null;
  category: string;
}

export interface TopStoryNews {
  title: string;
  url: string;
  updateAt: string;
  description: string;
  image: string | null;
  category: string;
}

export interface ForYouNews {
  author: string;
  title: string;
  url: string;
  updatedAt: string;
  description: string;
  image: string;
}

export interface NewsCategory {
  value: string;
  label: string;
}

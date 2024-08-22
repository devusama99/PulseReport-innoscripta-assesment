# PulseReport News App

Welcome to the News App! This application aggregates news from multiple sources based on your preferences using REST APIs from three major news platforms.

## Disclaimer

**This app uses test/dev API keys and have limitated number of requests per 12 hours. Please Keep in mind while using the app.**

## Features

- **Personalized News**: Tailors news content according to user preferences.
- **Multiple News Sources**: Integrates with:
  - [The Guardian](https://open-platform.theguardian.com/)
  - [NewsAPI](https://newsapi.org/)
  - [The New York Times](https://developer.nytimes.com/apis)
- **Dockerized**: Easy to build and run using Docker.
- **Deployment**: Accessible via Netlify and Vercel.

## Getting Started

### Prerequisites

- Docker installed on your local machine.

### Building the App

To build the Docker image for the app, use the following command:

```bash
docker build . -t pulsereport-assesment-by-usama
```

Once the build is complete, you can run the app with:

```bash
docker run -p 3000:3000 pulsereport-assesment-by-usama
```

The app will be accessible at -[localhost](http://localhost:3000/).

## How It Works

**User Preferences:** Users input their news preferences into the app.
**API Requests:** The app queries news data from The Guardian, NewsAPI, and The New York Times based on these preferences.
**Display News:** Aggregates and displays relevant news articles to the user.

**ENV file and all API key are exposed on purpose so reviewing team doesn't have to make a lot of effort. But in Production never leave your .env file Exposed to public instead use env-example file in this to exposed env skeleton**

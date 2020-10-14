import Parser from "rss-parser";

export const loadPodcastFeed = async (rssUrl: string) => {
  const parser = new Parser();
  const feed = await parser.parseURL(rssUrl);
  return feed;
};

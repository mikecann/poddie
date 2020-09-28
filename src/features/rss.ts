import Parser from "rss-parser";

export interface Welcome5 {
  rss: RSS;
}

export interface RSS {
  channel:         Channel;
  "_xmlns:itunes": string;
  "_xmlns:atom":   string;
  _version:        string;
}

export interface Channel {
  title:         string;
  link:          Array<LinkClass | string>;
  description:   string;
  language:      string;
  copyright:     Copyright;
  lastBuildDate: string;
  category:      Array<CategoryClass | string>;
  author:        AuthorClass;
  summary:       AuthorClass;
  owner:         Owner;
  image:         Image;
  keyword:       AuthorClass;
  explicit:      AuthorClass;
  item:          Item[];
}

export interface AuthorClass {
  __prefix: Prefix;
  __text:   string;
}

export enum Prefix {
  Itunes = "itunes",
}

export interface CategoryClass {
  _text:    string;
  __prefix: Prefix;
}

export enum Copyright {
  Anjuandeep = "Anjuandeep",
  Anjunadeep = "Anjunadeep",
  WWWAnjunadeepCOM = "www.anjunadeep.com",
}

export interface Image {
  _href:    string;
  __prefix: Prefix;
}

export interface Item {
  title:       string;
  link:        string;
  description: string;
  author:      Array<AuthorClass | Copyright>;
  enclosure:   Enclosure;
  guid:        string;
  pubDate:     string;
  subtitle:    AuthorClass;
  explicit:    AuthorClass;
  duration:    AuthorClass;
}

export interface Enclosure {
  _url:    string;
  _length: string;
  _type:   Type;
}

export enum Type {
  AudioMPEG = "audio/mpeg",
}

export interface LinkClass {
  _rel:     string;
  _href:    string;
  _type:    string;
  __prefix: string;
  __text?:  string;
}

export interface Owner {
  name:     AuthorClass;
  email:    AuthorClass;
  __prefix: Prefix;
}

export const loadPodcastFeed = async (rssUrl: string) => {
  const parser = new Parser();
  const feed = await parser.parseURL(rssUrl);
  console.log("getPodcastFeed -> feed", feed)
  return feed;
}
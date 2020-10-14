import { ITunesAPIRequestResponse } from "./types";

export const searchPodcasts = async (term: string) => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${term}&entity=podcast&attributes=titleTerm,artistTerm&limit=200`
  );

  const json: ITunesAPIRequestResponse = await response.json();

  return json.results;
};

import { queryCache } from "react-query";
const keyPrefix = "react-query-cache";

export const depersistQueryCache = () => {
  for (var i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    if (!storageKey) continue;
    if (!storageKey.startsWith(keyPrefix)) continue;
    const json = localStorage.getItem(storageKey);
    if (!json) continue;
    const { data, key } = JSON.parse(json);
    queryCache.setQueryData(key, data);
  }
};

export const startPersistingQueryCache = () => {
  queryCache.subscribe((_, query) => {
    if (query) {
      localStorage.setItem(
        `${keyPrefix}${query.queryHash}`,
        JSON.stringify({
          data: query.state.data,
          key: query.queryKey,
        })
      );
    }
  });
};

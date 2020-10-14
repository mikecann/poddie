import { onMessageFromMain, sendMessageToMain } from "../../ipc";
import { hasEpisodeBeenDownloaded } from "../podcasts/podcasts";
import { PodcastSearchItem, Episode } from "../podcasts/podcastsSlice";

export const downloadEpisodeFromIPC = (
  podcast: PodcastSearchItem,
  episode: Episode,
  id: string,
  onProgress: (progressPercent: number) => any
) => {
  return new Promise((resolve, reject) => {
    const offDownloadSuccess = onMessageFromMain("download-success", (_, payload) => {
      if (id != payload.id) return;
      stopListeners();
      resolve();
    });

    const offDownloadError = onMessageFromMain("download-error", (_, payload) => {
      if (id != payload.id) return;
      stopListeners();
      reject(payload.error);
    });

    const offDownloadProgress = onMessageFromMain("download-progress", (_, payload) => {
      if (id != payload.id) return;
      onProgress(payload.progress);
    });

    const stopListeners = () => {
      offDownloadSuccess();
      offDownloadError();
      offDownloadProgress();
    };

    sendMessageToMain("download-episode", { episode, podcast, id });
  });
};

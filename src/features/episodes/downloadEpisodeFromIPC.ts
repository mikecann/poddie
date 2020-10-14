import { PodcastITunesInfo } from "../../api/itunes/types";
import { onMessageFromMain, sendMessageToMain } from "../../ipc";
import { generateId } from "../../utils/generateId";
import { Episode } from "./episodesSlice";

export const downloadEpisodeFromIPC = (
  podcast: PodcastITunesInfo,
  episode: Episode,
  onProgress: (progressPercent: number) => any
) => {
  const id = generateId();

  return new Promise<string>((resolve, reject) => {
    const offDownloadSuccess = onMessageFromMain("download-success", (_, payload) => {
      if (id != payload.id) return;
      stopListeners();
      resolve(payload.localPath);
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

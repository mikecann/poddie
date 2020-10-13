export type DownloadId = string;

export interface DownloadState {
  id: DownloadId;
  podcastId: number;
  episodeId: string;
  progressPercent: number;
  status: "downloading" | "success" | "error";
  error?: string;
}

import { Episode, Podcast } from "./features/podcasts";
import { ipcMain, ipcRenderer, BrowserWindow } from "electron";

export type IPCMessages = {
  "download-episode": {
    id: string;
    podcast: Podcast;
    episode: Episode;
  };
  "download-success": {
    id: string;
  };
  "download-error": {
    id: string;
    error: string;
  };
  "download-progress": {
    id: string;
    progress: number;
  };
  log: any;
};

export const onMessageFromMain = <T extends keyof IPCMessages>(
  messageName: T,
  handler: (event: Electron.IpcRendererEvent, data: IPCMessages[T]) => any
) => {
  ipcRenderer.on(messageName, handler);
  return () => ipcRenderer.off(messageName, handler);
};

export const onMessageFromRenderer = <T extends keyof IPCMessages>(
  messageName: T,
  handler: (event: Electron.IpcMainEvent, data: IPCMessages[T]) => any
) => {
  ipcMain.on(messageName, handler);
  return () => ipcMain.off(messageName, handler);
};

export const sendMessageToRenderer = <T extends keyof IPCMessages>(
  messageName: T,
  data: IPCMessages[T],
  window?: BrowserWindow
) => {
  (window ?? BrowserWindow.getFocusedWindow()).webContents.send(messageName, data);
};

export const sendMessageToMain = <T extends keyof IPCMessages>(
  messageName: T,
  data: IPCMessages[T]
) => {
  ipcRenderer.send(messageName, data);
};

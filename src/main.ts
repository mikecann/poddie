import { app, BrowserWindow, ipcMain } from "electron";
import electronDl, { download } from "electron-dl";
import { onMessageFromRenderer, sendMessageToRenderer } from "./ipc";
import { ensure } from "./utils/misc";
import path from "path";
import {
  getExtensionFromUrl,
  getPodcastDownloadDirectory,
  getEpisodeFilename,
  getEpisodeRemoteUrl,
} from "./utils/paths";

electronDl();

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const onReady = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Borrowed from: https://stackoverflow.com/questions/46102851/electron-download-a-file-to-a-specific-location
  onMessageFromRenderer("download-episode", async (event, { podcast, episode, id }) => {
    const remoteUrl = getEpisodeRemoteUrl(episode);
    const filename = getEpisodeFilename(episode);
    const directory = getPodcastDownloadDirectory(podcast);

    const localPath = path.join(directory, filename);

    console.log("downloading podcast episode", {
      podcast,
      episode,
      remoteUrl,
      filename,
      directory,
      localPath,
    });

    download(mainWindow, ensure(episode.feedInfo.enclosure).url, {
      directory,
      filename,
      onStarted: (item) => console.log("download started.."),
      openFolderWhenDone: true,
      onProgress: ({ percent }) => {
        sendMessageToRenderer("download-progress", { id, progress: percent });
        console.log("download progress", percent);
      },
    })
      .then((item) => {
        sendMessageToRenderer("download-success", { id, localPath });
        console.log("download finished", item.getSavePath());
      })
      .catch((error) => {
        sendMessageToRenderer("download-error", { id, error: error + "" });
        console.error("download error", error);
      });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    onReady();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

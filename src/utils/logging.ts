import { ipcRenderer } from "electron";
import { onMessageFromMain } from "../ipc";

export const listenForMainLogs = () => {
  onMessageFromMain("log", (event, args) => console.log("[MAIN]", ...args));
};

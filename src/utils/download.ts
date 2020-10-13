const { parse } = require("url");
const http = require("https");
const fs = require("fs");
const { basename } = require("path");

const TIMEOUT = 10000;

export const download = (url: string, path: string) => {
  const uri = parse(url);
  if (!path) {
    path = basename(uri.path);
  }
  const file = fs.createWriteStream(path);

  return new Promise(function (resolve, reject) {
    const request = http.get(uri.href).on("response", (res: any) => {
      const len = parseInt(res.headers["content-length"], 10);
      let downloaded = 0;
      res
        .on("data", function (chunk: any) {
          file.write(chunk);
          downloaded += chunk.length;
          const percent = ((100.0 * downloaded) / len).toFixed(2);
          console.log(`Downloading ${percent}% ${downloaded} bytes\r`);
        })
        .on("end", function () {
          file.end();
          console.log(`${uri.path} downloaded to: ${path}`);
          resolve();
        })
        .on("error", function (err: any) {
          reject(err);
        });
    });
    request.setTimeout(TIMEOUT, function () {
      request.abort();
      reject(new Error(`request timeout after ${TIMEOUT / 1000.0}s`));
    });
  });
};

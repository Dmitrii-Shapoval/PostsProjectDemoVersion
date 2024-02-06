const fs = require("fs");
const path = require("path");

const androidGradlePath = path.join("../android", ".gradle");
const androidBuildPath = path.join("../android", "build");
const androidAppBuildPath = path.join("../android/app", "build");
const aabAndApkPath = path.join("../", "_.abb-bundle_and_apk-release");
function deleteFolderRecursive(path, mainPath) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
  if (mainPath === path) {
    console.log(`Successfully deleted folder: ${path}`);
  }
}

deleteFolderRecursive(androidGradlePath, androidGradlePath);
deleteFolderRecursive(androidBuildPath, androidBuildPath);
deleteFolderRecursive(androidAppBuildPath, androidAppBuildPath);
deleteFolderRecursive(aabAndApkPath, aabAndApkPath);

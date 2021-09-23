// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = Object.assign(getDefaultConfig(__dirname), {
  resolver: {
    extraNodeModules: path.resolve(__dirname, "/../module"),
  },
  watchFolders: [path.resolve(__dirname + "/../module")],
});

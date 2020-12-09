const path = require("path");

module.exports = {
  stories: ["../storybook/stories/*.stories.(j|t)sx?"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-ondevice-knobs",
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, "../src")],
        transpileManager: true,
      },
    },
  ],
};

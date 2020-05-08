const path = require("path");

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.css$/,
      loaders: [
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: "./.storybook/",
            },
          },
        },
      ],

      include: path.resolve(__dirname, "../storybook/"),
    },
    //This is the new block for the addon
    {
      test: /\.stories\.js?$/,
      loaders: [require.resolve("@storybook/addon-storysource/loader")],
      include: [path.resolve(__dirname, "../storybook")],
      enforce: "pre",
    }
  );

  return config;
};

// what the webpack would look like without tailwind
// module.exports = {
//   module: {
//     rules: [
//       {
//         test: [/\.stories\.js$/, /index\.js$/],
//         include: [path.resolve(__dirname, '../src')],
//         enforce: 'pre',
//       },
//     ],
//   },
// };

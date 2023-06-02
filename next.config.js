/** @type {import('next').NextConfig} */
// next.config.js

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: false,
          },
        },
      ],
    });

    return config;
  },
};


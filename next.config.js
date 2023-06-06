/** @type {import('next').NextConfig} */
// next.config.js

module.exports = {
  env: {
    API_BASE_URL: "https://code-kage-backend.vercel.app/", // Update with your backend API base URL
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    });

    return config;
  },
  swcMinify: true,
};

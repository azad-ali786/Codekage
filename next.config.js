// next.config.js
module.exports = {
  env: {
    API_BASE_URL: "https://code-kage-backend.vercel.app/", // Update with your backend API base URL
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      });
    }
    return config;
  },
};

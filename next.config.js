
module.exports = {
  env: {
    API_BASE_URL: "https://code-kage-backend.vercel.app/", // Update with your backend API base URL
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.css$/,
        exclude: /node_modules\/monaco-editor/,
        use: ["style-loader", "css-loader"],
      });
    }

    return config;
  },
};

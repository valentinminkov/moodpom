const env = process.env.NODE_ENV || "development";

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-react-app",
        {
          development: env === "development",
          production: env === "production",
          test: env === "test",
        },
        "@babel/preset-env",
        "@babel/preset-react",
      ],
    ],
  };
};

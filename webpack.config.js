module.exports = {
  // ...
  module: {
    rules: [
      {
        exclude: [/node_modules/, /dist/],
        loader: 'eslint-loader',
      },
    ],
  },
  // ...
};

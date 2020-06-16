module.exports = {
  chainWebpack: (config) => {
    config.module.rule('eslint').exclude.add('E:\\ProgrammingFiles\\diot-project\\dist').end();
  },
};

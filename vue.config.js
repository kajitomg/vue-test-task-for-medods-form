const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/index.ts',
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
});
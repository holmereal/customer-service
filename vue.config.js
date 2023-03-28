module.exports = {
  chainWebpack: (config) => {
    config.module 
      .rule("mjs$")
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type("javascript/auto");
  },
};
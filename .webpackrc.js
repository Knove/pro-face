export default {
  proxy: {
    "/": {
      target: "http://localhost:7777/",
      changeOrigin: true,
      pathRewrite: { "^/": "" }
    }
  }
};

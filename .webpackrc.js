export default {
  proxy: {
    "/pro": {
      target: "http://localhost:7777/",
      changeOrigin: true,
      pathRewrite: { "^/pro": "/pro" }
    }
  }
};

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: '辰森OFFICE系统',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  publicPath: '/static/',
  hash: true,
  targets: {
    ie: 11,
  },
  context: {
    title: '辰森OFFICE系统',
  },
  devServer: {
    proxy: {
      "/pro": {
        target: "http://localhost:7777",
        changeOrigin: true,
        pathRewrite: { "^/pro": "/pro" }
      }
    }
  },
}

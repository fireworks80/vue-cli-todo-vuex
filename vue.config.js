module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
                @import "@/styles/_functions.scss";
            `
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}

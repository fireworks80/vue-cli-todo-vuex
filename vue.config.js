module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
                @import "@/styles/style.scss";`
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

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 指定转换基准【如果是vant要除以2，我们自己的样式，就按照75输出】
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown',
    },
  },
}

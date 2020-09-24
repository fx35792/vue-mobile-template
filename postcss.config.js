const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = ({ file }) => {
  let rootValue
  // console.log(file.dirname)
  // vant 37.5 [link](https://github.com/youzan/vant/issues/1181)
  // if (file && file.dirname && file.dirname.indexOf('vant') > -1 && file.dirname.indexOf('swiper') > -1) {
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 37.5
  } else {
    rootValue = 75
  }
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: rootValue,
        propList: ['*'],
        selectorBlackList: ['.swiper'], // 要忽略的选择器并保留为px。
        minPixelValue: 0
      })
    ]
  }
}
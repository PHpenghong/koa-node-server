const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const json = require('@rollup/plugin-json')
const { babel } = require('@rollup/plugin-babel')

module.exports = {
  input: 'server/run.js', // 入口文件路径
  output: {
    file: 'dist/bundle.js', // 输出文件路径
    format: 'cjs'
  },
  // 插件配置
  plugins: [
    resolve({
      browser: true, // 使用 browser 字段替代 main 和 module 字段
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    terser(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return
    warn(warning)
  }
}

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  // extends 和 plugins 都是有顺序之分的，所有的规则会先后进行覆盖
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    camelcase: 'off',
    'standard/computed-property-even-spacing': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'standard/no-callback-literal': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}

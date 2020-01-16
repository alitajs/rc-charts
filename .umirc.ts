export default {
  doc: {
    title: 'rc-charts'
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }
    ]
  ],
  hash: true,
  disableCSSModules: true
};

import { IBundleOptions } from 'father';
import path from 'path'

const options: IBundleOptions = {
  esm: {
    type: 'rollup',
    importLibToEs: true
  },
  cjs: 'rollup',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }]
  ],
  // @ts-ignore
  doc: {
    base: '/rc-charts',
    modifyBundlerConfig: (config) => {
      config['resolve'].alias = Object.assign({}, config['resolve'].alias, {
        '@charts': path.resolve(__dirname, 'src'),
      });
      return config;
    },
    public: 'docs/public',
    indexHtml: 'docs/index.html',
  }
};

export default options;

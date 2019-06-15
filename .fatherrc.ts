import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }]
  ]
};

export default options;

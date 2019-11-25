import { IBundleOptions } from 'father';
import path from 'path';

const env = process.env.NODE_ENV;

const options: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  doc: {
    title: 'Rc Charts',
    repository: 'https://github.com/alitajs/rc-charts'
  }
};

export default options;

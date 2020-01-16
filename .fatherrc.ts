import { IBundleOptions } from 'father-build';

const env = process.env.NODE_ENV;

const options: IBundleOptions = {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      },
    ],
  ]
};

export default options;

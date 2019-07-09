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
    base: '/rc-charts/',
    title: 'Rc Charts',
    description: 'react chart components',
    modifyBundlerConfig: (config) => {
      config['resolve'].alias = Object.assign({}, config['resolve'].alias, {
        '@charts': path.resolve(__dirname, 'src'),
      });
      return config;
    },
    // @ts-ignore
    htmlContext: {
      favicon: env === 'development'
        ? '/public/favicon.png'
        : '/rc-charts/public/favicon.png'
    },
    public: 'docs/public',
    indexHtml: 'docs/index.html',
    themeConfig: {
      logo: {
        src: env === 'development'
          ? '/public/logo.svg'
          : '/rc-charts/public/logo.svg',
        width: '60px',
      },
      styles: {
        container: {
          fontSize: 16,
        },
      },
      menu: [
        'Overview',
        'Components'
      ]
    },
    repository: 'https://github.com/alitajs/rc-charts',
  }
};

export default options;

# rc-charts

> 封装[BizCharts](https://github.com/alibaba/BizCharts)库

[![NPM version](https://img.shields.io/npm/v/rc-charts.svg?style=flat)](https://npmjs.org/package/rc-charts)
[![NPM downloads](http://img.shields.io/npm/dm/rc-charts.svg?style=flat)](https://npmjs.org/package/rc-charts)

# 特性

* 💡 TypeScript: 使用TypeScript编写
* 🎉 基于BizCharts: 阿里出品
* 🌴 简单易用: 针对常见图表二次封装，可傻瓜式使用
* 🍁 示例丰富: 尽可能多的提供图表示例

## 使用

* 安装

```
yarn add rc-charts
```

* 使用

```
import { Bar } form 'rc-charts';

const Example: React.FC = () => {
  return (
    <Bar
      data={
        [
          { x: '1951', y1: 20 },
          { x: '1952', y1: 10 },
          { x: '1953', y1: 20 },
          { x: '1954', y1: 100 },
          { x: '1955', y1: 10 },
          { x: '1956', y1: 50 }
        ]
      }
      titleMap={{
        y1: '销售额'
      }}
    />
  )
}

export default Example;
```

---
title: Funnel(漏斗图)
group:
  title: 组件
---

# Funnel charts

## 基础漏斗图

```jsx
import React from 'react';
import { Funnel } from 'rc-charts';

export default () => {
  return (
    <Funnel
      data={[
        {"x": "浏览网站", "y1": 50000},
        {"x": "放入购物车", "y1": 35000},
        {"x": "生成订单", "y1": 25000},
        {"x": "支付订单", "y1": 15000},
        {"x": "完成交易", "y1": 8000}
      ]}
      height={400}
      title={'基础漏斗图'}
      titlePosition={'center'}
      padding={[0, 200, 55, 200]}
      transpose={true}
      colors={["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]}
      labelText={{
        show: true,
        showValue: true,
        offsetX: 10,
        offsetY: 5,
      }}
      guideText={{
        show: true,
        fontSize: '12',
        color: '#fff',
        textAlign: 'center',
      }}
    />
  );
}
```

## 尖底倒漏斗图

```jsx
import React from 'react';
import { Funnel } from 'rc-charts';

export default () => {
  return (
    <Funnel
      data={[
        {"x": "浏览网站", "y1": 50000},
        {"x": "放入购物车", "y1": 35000},
        {"x": "生成订单", "y1": 25000},
        {"x": "支付订单", "y1": 15000},
        {"x": "完成交易", "y1": 8000}
      ]}
      height={400}
      padding={[0, 200, 55, 200]}
      colors={["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]}
      transpose={true}
      unInvert={false}
      isSharp={true}
      guideText={{
        show: true,
        fontSize: '12',
        color: '#fff',
        textAlign: 'center',
      }}
    />
  );
}
```

## 对比漏斗图

```jsx
import React from 'react';
import { Funnel } from 'rc-charts';

export default () => {
  return (
    <Funnel
      data={[
        {"x": "浏览网站", "y2": 100, "y1": 80},
        {"x": "放入购物车", "y2": 80,"y1": 50},
        {"x": "生成订单", "y2": 60,"y1": 30},
        {"x": "支付订单", "y2": 40,"y1": 10},
        {"x": "完成交易", "y2": 30,"y1": 5}
      ]}
      height={400}
      padding={[0, 200, 55, 200]}
      transpose={true}
      isSharp={true}
      colors={["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]}
      y2colors={["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"]}
      tooltipMap={{
        y1: '实际预期',
        y2: '期望预期',
      }}
      labelText={{
        show: true,
        showValue: false,
        offsetX: 10,
        offsetY: 5,
      }}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|--|--|--|--|
|height|指定图表的高度，单位为 'px'|number|400|
|data|图表的数据源|Array|[]|
|colors|自定义颜色|string[]|--|
|y2colors|y2自定义颜色|string[]|--|
|title|标题|string|--|
|titlePosition|标题的位置,可选：`left`、`center`、`right`|string|`left`|
|transpose|将坐标轴`x`轴和`y`轴交换|boolean|true|
|unInvert|漏斗图是否为尖头朝下|boolean|true|
|isSharp|漏斗图底部是否为尖形|boolean|false|
|tooltipMap|tooltip 显示的数据自定义名称|object|{}|
|guideText|显示在图表上的文字|object|如下|
|guideText.show|文字是否显示|boolean|false|
|guideText.fontSize|文字大小|number|12|
|guideText.color|文字颜色|string|`#fff`|
|labelText|显示在右侧的文字|object|如下|
|labelText.show|文字是否显示|boolean|false|
|labelText.showValue|文字是否显示数据|boolean|false|
|padding|内边距属性|number[]|auto|
|legend|图例样式|object|{}|
|tooltip|提示信息的样式配置|object|{}|

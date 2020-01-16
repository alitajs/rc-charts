---
title: Gauge(仪表盘)
group:
  title: 组件
---

# Gauge

## 最简使用

```jsx
import React from 'react';
import { Gauge } from 'rc-charts';

export default () => {
  return (
    <Gauge
      data={[
        { value: 8 }
      ]}
      valueSection={{
        min: 0,
        max: 10,
      }}
    />
  );
}
```

## 仪表盘

```jsx
import React from 'react';
import { Gauge } from 'rc-charts';

export default () => {
  return (
    <Gauge
      height={300}
      data={[
        { value: 8 }
      ]}
      valueSection={{
        min: 0,
        max: 10,
      }}
      tickInterval={1}
      lineColor={'red'}
      scaleSize={10}
      title={`仪表盘`}
      titlePosition={`center`}
      subTitle={`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">80%</p></div>`}

    />
  );
}
```

## 仪表盘(多色)

```jsx
import React from 'react';
import { Gauge } from 'rc-charts';

export default () => {
  return (
    <Gauge
      height={300}
      data={[
        { value: 8 }
      ]}
      valueSection={{
        min: 0,
        max: 10,
      }}
      scaleLine={[
        {num: 3, color: 'red',lineWidth: 3},
        {num: 5, color: 'yellow', lineWidth: 3},
        {num: 7, color: '#19AFFA', lineWidth: 3},
      ]}
      scaleArea={[
        {min: 0, max: 3, color: 'red'},
        {min: 3, max: 7, color: 'yellow'},
        {min: 7, max: 10, color: '#19AFFA'},
      ]}
      subTitle={`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">80%</p></div>`}
    />
  );
}
```

## 仪表盘(文字)

```jsx
import React from 'react';
import { Gauge } from 'rc-charts';

export default () => {
  return (
    <Gauge
      height={300}
      data={[
        { value: 8 }
      ]}
      valueSection={{
        min: 0,
        max: 10,
      }}
      labelFontSize={24}
      labelColor={`black`}
      ticks={[
        {num: 2, text: '差'},
        {num: 4, text: '中'},
        {num: 6, text: '良'},
        {num: 8, text: '优'}
      ]}
      scaleLine={[
        {num: 3, color: '#19AFFA',lineWidth: 3},
        {num: 5, color: '#19AFFA', lineWidth: 3},
        {num: 7, color: '#19AFFA', lineWidth: 3},
      ]}
      subTitle={`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">80%</p></div>`}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|--|--|--|--|
|height|指定图表的高度，单位为 'px'|number|400|
|data|仪表盘上显示的数据|Array|[]|
|valueSection|仪表盘数值区间: `min` 和 `max`|object|{}|
|tickInterval|仪表盘刻度各个标度点的间距|number|1|
|lineColor|仪表盘指针的颜色|string|`#1890FF`|
|ticks|刻度显示文字时使用,如下有属性显示|object|{}|
|ticks.num|刻度显示文字时使用, 表示在哪个位置显示|number|--|
|ticks.text|刻度显示文字时使用, 表示显示的内容|string|--|
|scaleLine|仪表盘下方连接的刻度线，可参考上图: `多色` 和 `文字`, 可参考下方的属性|object|{}|
|scaleLine.num|仪表盘刻度线, 在什么位置显示|number|--|
|scaleLine.color|仪表盘刻度线的颜色|string|--|
|scaleLine.lineWidth|仪表盘刻度线的宽度|number|--|
|scaleArea|刻度盘上的颜色修饰，可参考上图: `多色`，可参考下方的属性|object|{}|
|scaleArea.min|该颜色修饰的最小值|number|`valueSection`(数值区间) 的最小值|
|scaleArea.max|该颜色修饰的最大值|number|`valueSection`(数值区间) 的最大值|
|scaleArea.color|该修饰区间的颜色|string|#19AFFA|
|subTitle|仪表盘文字修饰|string|`<div></div>`|
|scaleSize|仪表盘的宽度|number|18|
|title|标题|string|--|
|labelFontSize|仪表盘刻度上的刻度大小|number|20|
|labelColor|仪表盘刻度上的刻度颜色|string|`#CBCBCB`|
|titlePosition|标题的位置,可选：`left`、`center`、`right`|string|`left`|
|padding|内边距属性|number[]|auto|

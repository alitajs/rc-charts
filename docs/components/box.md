---
title: Box(箱型图)
group:
  title: 组件
---

# Box charts

## 基础箱型图

```jsx
import React from 'react';
import { Box } from 'rc-charts';

export default () => {
  return (
    <Box
      data={[
        {"x": "三月", "key": "点赞量", "y1": 5,"y2": 9, "y3": 16,"y4": 24, "y5": 29},
        {"x": "三月", "key": "评论量", "y1": 5,"y2": 6, "y3": 15,"y4": 20, "y5": 23},
        {"x": "三月", "key": "下载量", "y1": 5,"y2": 6, "y3": 15,"y4": 20, "y5": 23}
      ]}
      height={400}
      colors={['rgb(28, 146, 255)']}
      borderWidth={40}
      valueSection={[0,50]}
      padding={[40, 50, 95, 50]}
      title={'基础箱型图'}
      legend={{
        marker: "circle",
        position: "top"
      }}
      tooltip={{
        showTitle: false,
      }}
    />
  );
}
```

## 分组箱型图

```jsx
import React from 'react';
import { Box } from 'rc-charts';

export default () => {
  return (
    <Box
      data={[
        {"x": "三月", "key": "点赞量", "y1": 1,"y2": 9, "y3": 16,"y4": 24, "y5": 29},
        {"x": "三月", "key": "评论量", "y1": 1,"y2": 6, "y3": 15,"y4": 20, "y5": 23},
        {"x": "三月", "key": "下载量", "y1": 1,"y2": 6, "y3": 15,"y4": 20, "y5": 23},
        {"x": "四月", "key": "点赞量", "y1": 2,"y2": 11, "y3": 20,"y4": 28, "y5": 33},
        {"x": "四月", "key": "评论量", "y1": 3,"y2": 12, "y3": 19,"y4": 27, "y5": 35},
        {"x": "四月", "key": "下载量", "y1": 3,"y2": 12, "y3": 19,"y4": 27, "y5": 35},
        {"x": "五月", "key": "点赞量", "y1": 2,"y2": 11, "y3": 20,"y4": 28, "y5": 33},
        {"x": "五月", "key": "评论量", "y1": 3,"y2": 12, "y3": 19,"y4": 27, "y5": 35},
        {"x": "五月", "key": "下载量", "y1": 3,"y2": 12, "y3": 19,"y4": 27, "y5": 35}
      ]}
      height={400}
      colors={['rgb(28, 146, 255)', 'rgb(77, 201, 115)', 'red']}
      borderWidth={30}
    />
  );
}
```

## 基础箱型图(异常)

```jsx
import React from 'react';
import { Box } from 'rc-charts';

export default () => {
  return (
    <Box
      data={[
        {"x": "三月", "key": "点赞量", "y1": 5,"y2": 9, "y3": 16,"y4": 24, "y5": 29, "outliers": [33, 35]},
        {"x": "三月", "key": "评论量", "y1": 5,"y2": 6, "y3": 15,"y4": 20, "y5": 23, "outliers": [30]},
        {"x": "三月", "key": "下载量", "y1": 5,"y2": 6, "y3": 15,"y4": 20, "y5": 23, "outliers": [2, 30, 34, 36]}
      ]}
      height={400}
      colors={['rgb(77, 201, 115)']}
      borderWidth={40}
      valueSection={[0,50]}
      outlierColor={['red']}
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
|borderWidth|线的宽度|number|2|
|valueSection|y轴坐标区间|number[]|[]|
|outlierColor|异常值点的颜色|string[]|--|
|padding|内边距属性|number[]|auto|
|xAxis|x坐标轴的配置|object|{}|
|yAxis|y坐标轴的配置|object|{}|
|legend|图例样式|object|{}|



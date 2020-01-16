---
title: Radar(雷达图)
group:
  title: 组件
---

# Radar charts

## 基础雷达图

```jsx
import React from 'react';
import { Radar } from 'rc-charts';

export default () => {
  return (
    <Radar
      data={
        [
          {"x": "苹果", "y1": 70, "y2": 30},
          {"x": "梨子", "y1": 50, "y2": 60},
          {"x": "西瓜", "y1": 60, "y2": 70},
          {"x": "橙子", "y1": 40, "y2": 50},
          {"x": "葡萄", "y1": 60, "y2": 70},
          {"x": "香蕉", "y1": 80, "y2": 50},
          {"x": "桃子", "y1": 50, "y2": 40},
          {"x": "榴莲", "y1": 70, "y2": 60}
        ]
      }
      titleMap={{
        "y1": "下载量",
        "y2": "点赞量"
      }}
      cols={{
        "value": {
          min: 0,
          max: 80,
        }
      }}
      colors={['green', 'yellow']}
      radius={0.75}
      borderWidth={2}
      height={400}
      title={'雷达图'}
      padding={[40, 40, 95, 20]}
    />
  );
}
```

## 基础雷达图(线)

```jsx
import React from 'react';
import { Radar } from 'rc-charts';

export default () => {
  return (
    <Radar
      data={
        [
          {"x": "苹果", "y1": 70, "y2": 30},
          {"x": "梨子", "y1": 50, "y2": 60},
          {"x": "西瓜", "y1": 60, "y2": 70},
          {"x": "橙子", "y1": 40, "y2": 50},
          {"x": "葡萄", "y1": 60, "y2": 70},
          {"x": "香蕉", "y1": 80, "y2": 50},
          {"x": "桃子", "y1": 50, "y2": 40},
          {"x": "榴莲", "y1": 70, "y2": 60}
        ]
      }
      titleMap={{
        "y1": "下载量",
        "y2": "点赞量"
      }}
      areas={false}
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
|radius|设置半径，[0-1]的小数|number(0-1)|1|
|titleMap|数据源 `key` 对应的标题|object|{}|
|areas|是否出现面积样式|boolean|true|
|cols|配置数据比例尺，该配置会影响数据在图表中的展示方式(可以参考`基础雷达图`)|object|--|
|borderWidth|线的宽度|number|2|
|title|图表左上方的文字显示|string|--|
|padding|内边距属性|number[]|auto|
|xAxis|x坐标轴的配置|object|{}|
|yAxis|y坐标轴的配置|object|{}|

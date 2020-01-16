---
title: Point(点图)
group:
  title: 组件
---

# Point charts

## 散点图

```jsx
import React from 'react';
import { Point } from 'rc-charts';

export default () => {
  return (
    <Point
      data={
        [
          {"x": 180, "y": 90, "type": "A"},
          {"x": 178, "y": 70, "type": "A"},
          {"x": 175, "y": 68, "type": "A"},
          {"x": 172, "y": 65, "type": "A"},
          {"x": 170, "y": 60, "type": "A"},
          {"x": 165, "y": 59, "type": "A"},
          {"x": 183, "y": 71, "type": "A"},
          {"x": 177, "y": 66, "type": "A"},
          {"x": 176, "y": 59, "type": "A"},
          {"x": 170, "y": 62, "type": "A"}
        ]
      }
      height={200}
      pointSize={6}
      title={'散点图'}
      titlePosition={'center'}
      padding={[10, 40, 20, 40]}
      valueSection={{
        'x': [160, 190],
        'y': [30, 100],
      }}
      titleMap={{
        'x': '身高',
        'y': '体重'
      }}
      units={{
        'x': 'cm',
        'y': 'kg'
      }}
    />
  );
}
```

## 多色散点图

```jsx
import React from 'react';
import { Point } from 'rc-charts';

export default () => {
  return (
    <Point
      data={[
        {"x": 180, "y": 90, "type": "A"},
        {"x": 178, "y": 70, "type": "A"},
        {"x": 175, "y": 68, "type": "A"},
        {"x": 172, "y": 65, "type": "A"},
        {"x": 170, "y": 60, "type": "A"},
        {"x": 165, "y": 59, "type": "A"},
        {"x": 183, "y": 71, "type": "A"},
        {"x": 177, "y": 66, "type": "A"},
        {"x": 176, "y": 59, "type": "A"},
        {"x": 170, "y": 62, "type": "A"},
        {"x": 180, "y": 85, "type": "B"},
        {"x": 178, "y": 66, "type": "B"},
        {"x": 175, "y": 63, "type": "B"},
        {"x": 172, "y": 61, "type": "B"},
        {"x": 179, "y": 59, "type": "B"},
        {"x": 165, "y": 58, "type": "B"},
        {"x": 183, "y": 75, "type": "B"},
        {"x": 177, "y": 70, "type": "B"},
        {"x": 176, "y": 68, "type": "B"},
        {"x": 173, "y": 61, "type": "B"}
      ]}
      height={300}
      colors={['rgb(77, 201, 115)', 'red']}
      titleMap={{
        'x': '身高',
        'y': '体重'
      }}
      units={{
        'x': 'cm',
        'y': 'kg'
      }}
    />
  );
}
```

## 多形状散点图

```jsx
import React from 'react';
import { Point } from 'rc-charts';

export default () => {
  return (
    <Point
      data={[
        {"x": 180, "y": 90, "type": "A"},
        {"x": 178, "y": 70, "type": "A"},
        {"x": 175, "y": 68, "type": "A"},
        {"x": 172, "y": 65, "type": "A"},
        {"x": 170, "y": 60, "type": "A"},
        {"x": 165, "y": 59, "type": "A"},
        {"x": 183, "y": 71, "type": "A"},
        {"x": 177, "y": 66, "type": "A"},
        {"x": 176, "y": 59, "type": "A"},
        {"x": 170, "y": 62, "type": "A"},
        {"x": 180, "y": 85, "type": "B"},
        {"x": 178, "y": 66, "type": "B"},
        {"x": 175, "y": 63, "type": "B"},
        {"x": 172, "y": 61, "type": "B"},
        {"x": 179, "y": 59, "type": "B"},
        {"x": 165, "y": 58, "type": "B"},
        {"x": 183, "y": 75, "type": "B"},
        {"x": 177, "y": 70, "type": "B"},
        {"x": 176, "y": 68, "type": "B"},
        {"x": 173, "y": 61, "type": "B"}
      ]}
      height={300}
      colors={['rgb(28, 146, 255)', 'rgb(77, 201, 115)']}
      shapes={['circle', 'square']}
      titleMap={{
        'x': '身高',
        'y': '体重'
      }}
      units={{
        'x': 'cm',
        'y': 'kg'
      }}
    />
  );
}
```

## 扰动点图

```jsx
import React from 'react';
import { Point } from 'rc-charts';

export default () => {
  return (
    <Point
      data={[
        {"x": "春天", "y": 90, "type": "A"},
        {"x": "春天", "y": 70, "type": "A"},
        {"x": "春天", "y": 68, "type": "A"},
        {"x": "春天", "y": 65, "type": "A"},
        {"x": "春天", "y": 60, "type": "A"},
        {"x": "夏天", "y": 59, "type": "A"},
        {"x": "夏天", "y": 71, "type": "A"},
        {"x": "夏天", "y": 66, "type": "A"},
        {"x": "夏天", "y": 59, "type": "A"},
        {"x": "夏天", "y": 62, "type": "A"},
        {"x": "秋天", "y": 85, "type": "B"},
        {"x": "秋天", "y": 66, "type": "B"},
        {"x": "秋天", "y": 63, "type": "B"},
        {"x": "秋天", "y": 61, "type": "B"},
        {"x": "秋天", "y": 59, "type": "B"},
        {"x": "冬天", "y": 58, "type": "B"},
        {"x": "冬天", "y": 75, "type": "B"},
        {"x": "冬天", "y": 70, "type": "B"},
        {"x": "冬天", "y": 68, "type": "B"},
        {"x": "冬天", "y": 61, "type": "B"}
      ]}
      height={400}
      colors={['rgb(28, 146, 255)', 'rgb(77, 201, 115)']}
      units={{
        'y': 'ml'
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
|title|标题|string|--|
|titlePosition|标题的位置,可选：`left`、`center`、`right`|string|`left`|
|titleMap|`x`轴和`y`轴对应的坐标名称|object|{}|
|units|`x`轴和`y`轴对应坐标的单位|object|{}|
|valueSection|`x`轴和`y`轴对应坐标的区间|object|{}|
|shapes|散点的形状|string[]|['circle']|
|pointSize|散点的大小|number|4|
|padding|内边距属性|number[]|auto|
|xAxis|x坐标轴的配置|object|{}|
|yAxis|y坐标轴的配置|object|{}|
|legend|图例样式|object|{}|
|showTitle|`Tooltip`的标题展示|boolean|false|
|tooltip|提示信息的样式配置|object|{}|

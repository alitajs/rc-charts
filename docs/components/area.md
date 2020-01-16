---
title: Area(面积图)
order: 1
group:
  title: 组件
---

# Area

## 基础面积图

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      title="基础面积图"
      data={
        [
          {x: '2019-06-20', y: 7},
          {x: '2019-06-21', y: 5},
          {x: '2019-06-22', y: 4},
          {x: '2019-06-23', y: 2},
          {x: '2019-06-24', y: 4},
          {x: '2019-06-25', y: 7},
          {x: '2019-06-26', y: 5},
          {x: '2019-06-27', y: 6},
          {x: '2019-06-28', y: 5}
        ]
      }
    />
  );
}
```

## 基础面积图 mini

> ant-design-pro 示例

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      colors={['#975FE4']}
      data={[
        { x: '2019-07-07', y: 7 },
        { x: '2019-07-08', y: 5 },
        { x: '2019-07-09', y: 4 },
        { x: '2019-07-10', y: 2 },
        { x: '2019-07-11', y: 4 },
        { x: '2019-07-12', y: 7 },
        { x: '2019-07-13', y: 5 },
        { x: '2019-07-14', y: 6 },
        { x: '2019-07-15', y: 5 },
        { x: '2019-07-16', y: 9 },
        { x: '2019-07-17', y: 6 },
        { x: '2019-07-18', y: 3 },
        { x: '2019-07-19', y: 1 },
        { x: '2019-07-20', y: 5 },
        { x: '2019-07-21', y: 3 },
        { x: '2019-07-22', y: 6 },
        { x: '2019-07-23', y: 5 },
      ]}
      smooth={true}
      height={46}
      mini={true}
      titleMap={{
        y: '访问量'
      }}
    />
  );
}
```

## 光滑面积图

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      data={
        [
        {x: '2019-06-20', y: 7},
        {x: '2019-06-21', y: 5},
        {x: '2019-06-22', y: 4},
        {x: '2019-06-23', y: 2},
        {x: '2019-06-24', y: 4},
        {x: '2019-06-25', y: 7},
        {x: '2019-06-26', y: 5},
        {x: '2019-06-27', y: 6},
        {x: '2019-06-28', y: 5}
        ]
      }
      smooth={true}
    />
  );
}
```

## 堆叠线图

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      data={
        [
          { x: '1750', y1: 20, y2: 10 },
          { x: '1800', y1: 10, y2: 5 },
          { x: '1850', y1: 50, y2: 25 },
          { x: '1900', y1: 60, y2: 30 },
          { x: '1999', y1: 10, y2: 5 },
          { x: '2050', y1: 100, y2: 50 }
        ]
      }
      isStack={true}
    />
  );
}
```

## 自定义1

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      data={[
        { x: '0', y1: 100, y2: 90 },
        { x: '1', y1: 10, y2: 20 },
        { x: '2', y1: 10, y2: 20 },
        { x: '3', y1: 10, y2: 30 },
        { x: '4', y1: 20, y2: 10 },
        { x: '5', y1: 30, y2: 40 },
        { x: '6', y1: 100, y2: 110 },
        { x: '7', y1: 200, y2: 220 },
        { x: '8', y1: 300, y2: 330 },
        { x: '9', y1: 400, y2: 400 },
        { x: '10', y1: 300, y2: 280 },
        { x: '11', y1: 200, y2: 250 },
        { x: '12', y1: 100, y2: 140 },
        { x: '13', y1: 300, y2: 330 },
        { x: '14', y1: 400, y2: 380 },
        { x: '15', y1: 500, y2: 600 },
        { x: '16', y1: 0, y2: 700 },
        { x: '17', y1: 0, y2: 290 },
        { x: '18', y1: 0, y2: 480 },
        { x: '19', y1: 0, y2: 600 },
        { x: '20', y1: 0, y2: 650 },
        { x: '21', y1: 0, y2: 220 },
        { x: '22', y1: 0, y2: 170 },
        { x: '23', y1: 0, y2: 100 }
      ]}
      title="人流量趋势"
      xAxis={{
        line: null
      }}
      yAxis={{
        visible: false
      }}
      legend={{
        position: 'top-right',
        marker: 'circle'
      }}
      scale={{
        x: {
          type: 'linear',
          tickInterval: 2,
          maxLimit: 23
        }
      }}
      titleMap={{
        y1: '当前',
        y2: '上一周期'
      }}
      smooth={true}
      colors={['#8DDDCC', '#E3E3E3']}
    />
  );
}
```

## 自定义2

```jsx
import React from 'react';
import { Area } from 'rc-charts';

export default () => {
  return (
    <Area
      data={
        [
          { x: '0', y1: 20 },
          { x: '4', y1: 10 },
          { x: '8', y1: 50 },
          { x: '12', y1: 60 },
          { x: '16', y1: 10 },
          { x: '20', y1: 100 },
          { x: '24', y1: 10 }
        ]
      }
      legend={{
        visible: false
      }}
      scale={{
        x: {
          type: 'linear',
          alias: '时段'
        },
        value: {
          alias: '次数'
        }
      }}
      line={true}
      point={true}
      colors={['#FDE6E6']}
    />
  );
}
```

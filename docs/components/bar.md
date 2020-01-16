---
title: Bar(柱状图)
group:
  title: 组件
---

# Bar Chart

## 基础柱状图

```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
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
  );
}
```

## 基础柱状图 - 均值线

```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
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
      meanLine={{
      }}
      titleMap={{
        y1: '销售额'
      }}
    />
  );
}
```

## 基础柱状图 mini

> ant-design-pro 示例


```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
  return (
    <div style={{ width: 200 }}>
      <Bar
        height={46}
        colors={['#1890FF']}
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
        mini={true}
        titleMap={{
          y: '访问量'
        }}
      />
    </div>
  );
}
```

## 堆叠柱状图

```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
  return (
    <Bar
      data={
        [
          { x: 'Jan', london: 18.9, berlin: 12.4 },
          { x: 'Feb', london: 28.8, berlin: 23.2 },
          { x: 'Mar', london: 39.3, berlin: 34.5 },
          { x: 'Apr', london: 81.4, berlin: 23.2 },
          { x: 'May', london: 47, berlin: 99.7 },
          { x: 'Jun', london: 20.3, berlin: 52.6 },
          { x: 'Jul', london: 24, berlin: 35.5 },
          { x: 'Aug', london: 35.6, berlin: 37.4 }
        ]
      }
      titleMap={{
        london: 'London',
        berlin: 'Berlin'
      }}
      type="intervalStack"
    />
  );
}
```

## 基础条形图

```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
  return (
    <Bar
      data={
        [
          { x: '1951', y1: 20 },
          { x: '1952', y1: 10 },
          { x: '1953', y1: 20 }
        ]
      }
      direction="horizontal"
      titleMap={{
        y1: '销售额'
      }}
    />
  );
}
```

## 坐标轴自定义


```jsx
import React from 'react';
import { Bar } from 'rc-charts';

export default () => {
  return (
    <Bar
      data={
        [
          { x: 'monday', series: 2800 },
          { x: 'tuesday', series: 1800 },
          { x: 'wednesday', series: 950 },
          { x: 'thursday', series: 500 },
          { x: 'friday', series: 170 }
        ]
      }
      title="我是标题"
      padding={['auto', 100, 'auto']}
      showLegend={false}
      xAxis={{
        line: null,
        tickLine: null,
        grid: null
      }}
      yAxis={{
        visible: false
      }}
      colors={['#1DBB99']}
      showLabel={true}
      direction="horizontal"
      titleMap={{
        series: 'Series'
      }}
    />
  );
}
```

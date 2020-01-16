---
title: Line(折线图)
group:
  title: 组件
---

# Line Chart

## 基本折线图

```jsx
import React from 'react';
import { Line } from 'rc-charts';

export default () => {
  return (
    <Line
      data={
        [
          { x: '1750', y1: 20 },
          { x: '1800', y1: 10 },
          { x: '1850', y1: 50 },
          { x: '1900', y1: 60 },
          { x: '1999', y1: 10 },
          { x: '2050', y1: 100 }
        ]
      }
      titleMap={{
        y1: '下载数'
      }}
    />
  );
}
```

## 平滑线图

```jsx
import React from 'react';
import { Line } from 'rc-charts';

export default () => {
  return (
    <Line
      data={
        [
          { x: '1750', y1: 20 },
          { x: '1800', y1: 10 },
          { x: '1850', y1: 50 },
          { x: '1900', y1: 60 },
          { x: '1999', y1: 10 },
          { x: '2050', y1: 100 }
        ]
      }
      smooth={true}
      titleMap={{
        y1: '下载数'
      }}
    />
  );
}
```

## 堆叠线图

```jsx
import React from 'react';
import { Line } from 'rc-charts';

export default () => {
  return (
    <Line
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
      titleMap={{
        y1: '下载数',
        y2: '点赞数'
      }}
    />
  );
}
```

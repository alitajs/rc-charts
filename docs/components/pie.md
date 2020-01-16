---
title: Pie(饼图)
group:
  title: 组件
---

# Pie

## 基础饼图

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={
        [
          { x: 'chrome', y: 20 },
          { x: 'IE', y: 20 },
          { x: 'Firefox', y: 20 }
        ]
      }
      tooltip={true}
      innerRadius={0}
    />
  );
}
```

## 基础环图

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={[
        { x: 'chrome', y: 20 },
        { x: 'IE', y: 20 },
        { x: 'Firefox', y: 20 }
      ]}
      tooltip={true}
      innerRadius={0.75}
      subTitle="总预警数"
      total={100}
      height={300}
    />
  );
}
```

## 基础环图 - 自动计算总数

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={[
        { x: 'chrome', y: 20 },
        { x: 'IE', y: 20 },
        { x: 'Firefox', y: 20 }
      ]}
      tooltip={true}
      innerRadius={0.75}
      subTitle="总预警数"
      autoTotal={true}
      height={300}
    />
  );
}
```

## 显示详细图例

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={[
        { x: '真实预警', y: 1 },
        { x: '安全隐患', y: 23 },
        { x: '测试/巡检', y: 15 },
        { x: '误报', y: 6 },
        { x: '未确认', y: 2 }
      ]}
      colors={['#F35A58', '#F7CF5F', '#37B0E9', '#6D5EAC', '#DFDFDF']}
      tooltip={true}
      subTitle="预警总数"
      total={235}
      height={300}
      innerRadius={0.75}
      hasLegend={true}
    />
  );
}
```

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={[
        { x: '正常', y: 3569 },
        { x: '预警', y: 1 },
        { x: '故障', y: 26 },
        { x: '失联', y: 19 },
        { x: '未激活', y: 26 }
      ]}
      colors={['#F35A58', '#F7CF5F', '#37B0E9', '#6D5EAC', '#DFDFDF']}
      tooltip={true}
      subTitle="预警总数"
      total={235}
      height={300}
      innerRadius={0.75}
      hasLegend={true}
    />
  );
}
```

## 自定义

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={
        [
          { x: '常住', y: 4990 },
          { x: '外来', y: 110 }
        ]
      }
      innerRadius={0.75}
      total={5100}
      legend={{
        visible: true
      }}
      subTitle="出入总人数"
      colors={['#6D5EAC', '#DFDFDF', '#F35A58']}
      tooltip={true}
      height={300}
    />
  );
}
```

## 自定义颜色

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={
        [
          { x: 'chrome', y: 20 },
          { x: 'IE', y: 20 },
          { x: 'Firefox', y: 20 }
        ]
      }
      colors={['#6D5EAC', '#DFDFDF', '#F35A58']}
      tooltip={true}
    />
  );
}
```

## 百分比

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie percent={60} />
  );
}
```

## 南丁格尔玫瑰彩图

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={
        [
          { x: "2001", y: 41.8 },
          { x: "2002", y: 38 },
          { x: "2003", y: 33.7 },
          { x: "2004", y: 30 },
          { x: "2005", y: 25.8 },
          { x: "2006", y: 31.7 },
          { x: "2007", y: 33 },
          { x: "2008", y: 46 },
          { x: "2009", y: 38.3 },
        ]
      }
      tooltip={true}
      type="polar"
    />
  );
}
```

## 南丁格尔玫瑰环图

```jsx
import React from 'react';
import { Pie } from 'rc-charts';

export default () => {
  return (
    <Pie
      data={
        [
          { x: "2001", y: 41.8 },
          { x: "2002", y: 38 },
          { x: "2003", y: 33.7 },
          { x: "2004", y: 30 },
          { x: "2005", y: 25.8 },
          { x: "2006", y: 31.7 },
          { x: "2007", y: 33 },
          { x: "2008", y: 46 },
          { x: "2009", y: 38.3 },
        ]
      }
      innerRadius={0.2}
      tooltip={true}
      type="polar"
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|--|--|--|--|
|type|类型，可选值为`polar`、`theta`| string |`theta`|
|animate|动画开关|boolean|true|
|colors|自定义颜色|string[]|--|
|height|指定图表的高度，单位为 'px'|number|400|
|data|图表的数据源|Array|[]|
|forceFit|图表的宽度自适应开关|boolean|true|
|radius|设置半径，[0-1]的小数|number(0-1)|1|
|innerRadius|内部极坐标系的半径|number(0-1)|0|

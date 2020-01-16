---
title: Calendar(日历色块图)
group:
  title: 组件
---

# Heat Map

## 水平日历色块图 - 基本使用

```jsx
import React from 'react';
import { Calendar } from 'rc-charts';

export default () => {
  return (
    <Calendar
      range={['2019-03', '2020-02']}
      data={{
        '2019-03-01': 10,
        '2019-04-05': 2,
        '2019-04-05': 5,
      }}
      height={250}
      padding="auto"
      colors={'#BAE7FF-#1890FF-#0050B3'}
    />
  );
}
```

## 水平日历色块图 - 以周日为一周的开始

```jsx
import React from 'react';
import { Calendar } from 'rc-charts';

export default () => {
  return (
    <Calendar
      range={['2019-03', '2020-02']}
      data={{
        '2019-03-01': 10,
        '2019-04-05': 2,
        '2019-04-05': 5,
      }}
      weekStart={7}
      height={250}
      padding="auto"
      colors={'#BAE7FF-#1890FF-#0050B3'}
    />
  );
}
```

## API

|参数|说明|类型|默认值|
|--|--|--|--|
|range|时间范围，例如`'2019'`、`'2019-01'`、`['2019-01', '2019-06']`| string \| string[] |--|
|animate|动画开关|boolean|true|
|colors|自定义颜色|string[]|--|
|height|指定图表的高度，单位为 'px'|number|400|
|data|图表的数据源|object|{}|
|forceFit|图表的宽度自适应开关|boolean|true|
|colors|自定义颜色|string|--|
|borderWidth|日期块border宽度|number|2|
|weekStart|一周以周几为开始|1 \| 7|1|

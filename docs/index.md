---
title: 快速开始
order: 10
---

<div align="center">
  <h1>Rc-Charts</h1>
</div>

> 一个基于BizCharts的图表库

[![NPM version](https://img.shields.io/npm/v/rc-charts.svg?style=flat)](https://npmjs.org/package/rc-charts)
[![NPM downloads](http://img.shields.io/npm/dm/rc-charts.svg?style=flat)](https://npmjs.org/package/rc-charts)

## Installation

Install rc-charts from npm:

```
npm install rc-charts || yarn add rc-charts
```

## Usage

```
import React from 'react';
import { Pie } form 'rc-charts';

const App: React.FC = () => {
  return (
    <div>
      <Pie
        data={[
          { x: 'chrome', y: 20 },
          { x: 'IE', y: 20 },
          { x: 'Firefox', y: 20 }
        ]}
        tooltip={true}
        subTitle="总预警数"
        total={100}
      />
    </div>
  );
}

export default App
```

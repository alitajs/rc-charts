import React from 'react';
import classNames from 'classnames';
import {
  Chart,
  Tooltip,
  Geom,
  Axis,
  Legend,
  LegendProps,
  AxisProps,
  View,
  TooltipProps
} from 'bizcharts';
import { DataView } from '@antv/data-set';
import isArray from '@pansy/is-array';
import { Padding } from '../types';

const prefixCls = 'rc-line-chart';

export interface DataItem {
  x: any;
  [key: string]: number;
}

export interface IBoxChartProps {
  className?: string;
  style?: React.CSSProperties;
  padding?: Padding;
  height?: number;
  colors?: string[];
  data: DataItem[];
  title?: string | React.ReactNode;
  legend?: LegendProps;
  tooltip?: TooltipProps;
  borderWidth?: number;
  xAxis?: AxisProps;
  // y轴相关配置
  yAxis?: Partial<AxisProps>;
  // y轴 区间
  valueSection?: number[];
  // 异常值点的颜色
  outlierColor?: string[];
}

const BoxChart: React.FC<IBoxChartProps> = (props) => {
  const {
    className,
    style,
    data,
    height,
    colors,
    borderWidth,
    valueSection,
    outlierColor,
    xAxis,
    yAxis,
    legend,
    tooltip,
    padding,
    title,
  } = props;

  // has `outliers` property ?
  let outliersFlag = false;
  data.map((item, index) => {
    if(item.hasOwnProperty(`outliers`)) {
      outliersFlag = true;
    }
    return index;
  });

  // 颜色区间
  let colorMap = {};
  data.map((item, index) => {
    if(item.hasOwnProperty(`x`) && colorMap[item[`x`]] === undefined) {
      colorMap[item[`x`]] = colors[Object.keys(colorMap).length];
    }
    return index;
  });

  // scale sols
  let cols = {};
  if(valueSection && valueSection.length > 1) {
    cols[`bin`] = {
      min: valueSection[0],
      max: valueSection[1],
    };
    cols[`outliers`] = {
      min: valueSection[0],
      max: valueSection[1],
    }
  }

  // dv
  const [chartData, setChartData] = React.useState([]);
  React.useEffect(() => {
    if(isArray(data)) {
      const item = data[0];
      if(!item) return;

      const newKeys = Object.keys(data[0]).filter(item => (item !== 'x' && item !== 'key' && item !== 'outliers'));
      let newData = [];
      data.map((row, index) => {
        let newRow = {};
        newKeys.forEach(item => {
          newRow = {};
          newRow[`x`] = row[`x`];
          newRow[`key`] = row[`key`];
          newRow[`value`] = row[item];
          newData.push(newRow);
        });
        return index;
      });
      const dv = new DataView();
      dv.source(newData)
        .transform({
          type: 'bin.quantile',
          field: 'value',
          as: 'bin',
          groupBy: ['x', 'key']
        });
      setChartData(dv);
    }
  }, [props.data]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      {title && (<h4>{title}</h4>)}
      <Chart
        height={height}
        data={chartData}
        scale={cols}
        padding={padding}
        forceFit
      >
        <Axis key="axis-x" name="x" {...xAxis} />
        <Axis key="axis-y" name="value" {...yAxis} />
        <Tooltip {...tooltip} />
        <Legend {...legend} />
        <Geom
          type="schema"
          position="key*bin"
          size={borderWidth}
          color={[
            'x',
            val => {
              return colorMap[val];
            }
          ]}
          style={[
            'x',
            {
              stroke: 'rgba(0, 0, 0, 0.45)',
              fill: val => {
                return colorMap[val];
              },
              fillOpacity: 0.3
            }
          ]}
          shape="box"
          adjust="dodge"
        />
        {outliersFlag ?
          <View data={data}>
            <Geom
              type='point'
              position='key*outliers'
              shape="circle"
              color={['x', outlierColor]}
              size={3}
              active={false}
              adjust="dodge"
            />
          </View> : ''
        }
      </Chart>

    </div>
  )
};

BoxChart.defaultProps = {
  data: [],
  height: 400,
  colors: [],
  borderWidth: 20,
  valueSection: [],
  outlierColor: [],
  xAxis: {},
  yAxis: {},
  legend: {},
  tooltip: {},
  padding: 'auto',
};

export default BoxChart;

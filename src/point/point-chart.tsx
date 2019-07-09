import React from 'react';
import classNames from 'classnames';
import { G2, Chart, Tooltip, Geom, Coord, Axis, Legend, LegendProps, AxisProps, View, TooltipProps } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { isArray } from 'awe-utils';
import { TPadding } from '../global';
import Title, { TPosition } from '../components/title';

const prefixCls = 'rc-line-chart';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface IPointChartProps {
  className?: string;
  style?: React.CSSProperties;
  padding?: TPadding;
  height?: number;
  colors?: string[];
  data: IDataItem[];
  title?: string ;
  titlePosition?: TPosition;
  legend?: LegendProps;
  xAxis?: AxisProps;
  // y轴相关配置
  yAxis?: Partial<AxisProps>;
  tooltip?: TooltipProps;
  showTitle?: boolean;
  titleMap?: {
    [key: string]: any;
  };
  units?: {
    [key: string]:any;
  }
  valueSection?: object;
  shapes?: string[];
  pointSize?: number;
}

const PointChart: React.FC<IPointChartProps> = (props) => {
  const {
    className,
    style,
    padding,
    height,
    colors,
    data,
    title,
    titlePosition,
    legend,
    xAxis,
    yAxis,
    tooltip,
    showTitle,
    titleMap,
    units,
    valueSection,
    shapes,
    pointSize,
  } = props;

  // 检测 x 值是数值还是字符串
  // false: number; true: string
  let xFlag = false;
  if(isArray(data)) {
    const item = data[0];
    if(!item) return;
    typeof(item[`x`]) === 'string' ? xFlag = true : xFlag = false;
  }

  // scale cols
  let cols = {};
  if(valueSection[`y`] && valueSection[`y`].length > 1) {
    cols[`y`] = {
      min: valueSection[`y`][0],
      max: valueSection[`y`][1],
    }
  }
  if(valueSection[`x`] && valueSection[`x`].length > 1) {
    cols[`x`] = {
      min: valueSection[`x`][0],
      max: valueSection[`x`][1],
    }
  }

  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    if(isArray(data)) {
      const item = data[0];
      if(!item) return ;
      setChartData(props.data);
    }
  }, [props.data]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Title
        position={titlePosition}
        text={title}
      />
      <Chart
        height={height}
        padding={padding}
        data={chartData}
        scale={cols}
        forceFit
      >
        <Tooltip 
          showTitle={showTitle}
          crosshairs={{
            type: "cross"
          }}
          itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
          {...tooltip}
        />
        <Legend {...legend} />
        <Axis name="x" {...xAxis} />
        <Axis name="y" {...yAxis} />
        <Geom
          type="point"
          position="x*y"
          opacity={0.65}
          shape={['type', shapes]}
          color={['type', colors]}
          size={pointSize}
          adjust="jitter"
          tooltip={[
            "x*y*type", 
            (x, y, type) => {
              return {
                name: type, 
                value: xFlag ? x+' : '+y+units[`y`] : titleMap[`x`]+': '+x+units[`x`]+' ,'+titleMap[`y`]+': '+y+units[`y`], 
              }
            }
          ]}
        />
      </Chart>
    </div>
  )
}

PointChart.defaultProps = {
  height: 400,
  pointSize: 4,
  padding: 'auto',
  showTitle: false,
  shapes: ['circle'],
  valueSection: {},
}

export default PointChart;






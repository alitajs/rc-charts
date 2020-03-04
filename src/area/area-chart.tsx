import React from 'react';
import isArray from '@pansy/is-array';
import classNames from 'classnames';
import DataSet from '@antv/data-set';
import {
  Axis,
  Chart,
  Geom,
  Tooltip,
  TooltipProps,
  AxisProps,
  Legend,
  LegendProps
} from 'bizcharts';
import { Padding } from '../types';
import Title, { Position } from '../components/title';
import './area-chart.less';

export interface IDataItem {
  x: number | string;
  [key: string]: number | string;
}

export interface AreaProps {
  className?: string;
  title?: string;
  titlePosition?: Position;
  style?: React.CSSProperties;
  colors?: string[];
  height?: number;
  padding?: Padding;
  // 是否显示线
  // 默认显示
  line?: boolean;
  point?: boolean;
  // 图表动画开关，默认为 true，即开启动画。
  animate?: boolean;
  xAxis?: AxisProps;
  // 是否开启自适应
  forceFit?: boolean;
  scale?: any;
  isStack?: boolean;
  tooltip?: TooltipProps;
  // 图例配置
  legend?: LegendProps;
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: IDataItem[];
  titleMap?: {
    [key: string]: any;
  };
  mini?: boolean;
  // 是否平滑
  // 默认为false
  smooth?: boolean;
}

const prefixCls = 'rc-area-chart';
const { DataView } = DataSet;

const AreaChart: React.FC<AreaProps> = (props) => {
  const {
    className,
    title,
    titlePosition,
    isStack,
    style,
    animate,
    forceFit,
    height,
    scale,
    xAxis,
    yAxis,
    legend,
    colors,
    line,
    point,
    tooltip,
    titleMap,
    smooth,
    mini,
    padding,
    borderWidth,
    data: sourceData
  } = props;
  const [chartData, setChartData] = React.useState(null);
  const [cols, setCols] = React.useState({});

  const data = isArray(sourceData) ? sourceData : [];

  React.useEffect(() => {
    setCols(scale);
  }, [props.scale]);

  React.useEffect(() => {
    if (isArray(data)) {
      const item = data[0];

      if (!item) return;

      const newKeys = Object.keys(item).filter(item => item !== 'x');

      const dv = new DataView();
      dv.source(sourceData)
        .transform({
          type: 'map',
          callback(row) {
            const newRow = { ...row };
            newKeys.forEach(item => {
              newRow[titleMap[item] || item] = row[item];
            });
            return newRow;
          },
        })
        .transform({
          type: 'fold',
          fields: newKeys.map(item => titleMap[item] || item),
          key: 'key',
          value: 'value'
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
      {/** 图表标题 */}
      <Title
        position={titlePosition}
        text={title}
      />

      <Chart
        height={height}
        data={chartData}
        scale={cols}
        padding={padding}
        animate={animate}
        forceFit={forceFit}
      >
        {/** x轴 */}
        {!mini && (
          <Axis name="x" title {...xAxis}  />
        )}

        {/** y轴 */}
        {!mini && (
          <Axis name="value" title {...yAxis} />
        )}

        {/** 图例 */}
        {!mini && (
          <Legend {...legend}/>
        )}

        <Tooltip {...tooltip}/>

        <Geom
          type={isStack ? 'areaStack' : 'area'}
          position="x*value"
          color={
            (colors && colors.length) ? ['key', colors] : 'key'
          }
          shape={smooth ? 'smooth' : ''}
        />

        {line && (
          <Geom
            type={isStack ? 'areaStack' : 'area'}
            position="x*value"
            size={borderWidth}
            color={
              (colors && colors.length) ? ['key', colors] : 'key'
            }
            shape={smooth ? 'smooth' : ''}
          />
        )}

        {point && (
          <Geom
            type="point"
            position="x*value"
            size={4}
            shape="circle"
            color={
              (colors && colors.length) ? ['key', colors] : 'key'
            }
            style={{

            }}
          />
        )}
      </Chart>
    </div>
  )
};

AreaChart.defaultProps = {
  height: 400,
  line: true,
  animate: true,
  forceFit: true,
  borderWidth: 2,
  scale: {},
  titleMap: {},
  data: [],
  isStack: false,
  mini: false,
  padding: 'auto'
};

export default AreaChart;

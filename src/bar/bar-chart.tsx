import React from 'react';
import classNames from 'classnames';
import { isArray } from 'awe-utils';
import { DataView } from '@antv/data-set';
import {
  Chart,
  Tooltip,
  Geom,
  Legend,
  Axis,
  Coord,
  Label,
  AxisProps,
  LabelProps,
  LegendProps,
  TooltipProps
} from 'bizcharts';
import Title, { TPosition } from '../components/title';
import { TPadding } from '@/global';

const prefixCls = 'rc-bar-chart';

export interface IDataItem {
  x: string | number;
  [key: string]: string | number;
}

export interface IBarProps {
  className?: string;
  style?: React.CSSProperties;
  // 图标内边距
  padding?: TPadding;
  height?: number;
  data: IDataItem[];
  // 层叠 或 分组柱状图 颜色
  colors?: string[];
  title?: string;
  titlePosition?: TPosition;
  titleMap?: {
    [key: string]: any;
  };
  scale?: any;
  tooltip?: TooltipProps;
  // 是否显示Label
  showLabel?: boolean;
  label?: LabelProps;
  // 图例配置
  legend?: LegendProps;
  // x轴相关配置
  xAxis?: AxisProps;
  // y轴相关配置
  yAxis?: Partial<AxisProps>;
  // 柱状图类型
  // interval: 柱状图; intervalStack: 堆叠柱状图;
  type?: 'intervalStack' | 'interval';
  // 柱状图方向
  direction?: 'horizontal' | 'vertical';
  // 是否是mini图表
  // 默认为false
  mini?: boolean;
  borderWidth?: number;
  legendPosition?: string;
}

const BarChart: React.FC<IBarProps> = (props) => {
  const {
    className,
    type,
    scale,
    style,
    title,
    titlePosition,
    height,
    xAxis,
    yAxis,
    mini,
    colors,
    label,
    tooltip,
    showLabel,
    legend,
    padding,
    direction,
    titleMap,
    borderWidth,
    data: sourceData,
  } = props;
  const [chartData, setChartData] = React.useState(null);

  const data = isArray(sourceData) ? sourceData : [];

  React.useEffect(() => {
    if (isArray(sourceData)) {
      const item = sourceData[0];

      if (!item) return;

      const newKeys = Object.keys(item).filter(item => item !== 'x');

      const dv = new DataView();
      dv.source(data)
        .transform({
          type: 'map',
          callback(row: { y1: string; y2: string }) {
            const newRow = { ...row };
            newKeys.forEach(item => {
              newRow[titleMap[item]] = row[item];
            });
            return newRow;
          },
        })
        .transform({
          type: 'fold',
          fields: newKeys.map(item => titleMap[item]),
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
        text={title}
        position={titlePosition}
      />

      <Chart
        height={height}
        padding={padding}
        data={chartData}
        scale={scale}
        forceFit
      >
        {/** x轴 */}
        {!mini && (
          <Axis key="axis-x" name="x" {...xAxis} />
        )}

        {/** y轴 */}
        {!mini && (
          <Axis key="axis-y" name="value" { ...yAxis } />
        )}

        {!mini && (
          <Legend name="key" position="top" {...legend} />
        )}

        <Coord transpose={direction === 'horizontal'} />

        <Tooltip {...tooltip} />

        <Geom
          type={type}
          position="x*value"
          color={
            colors ? ['key', colors] : 'key'
          }
          size={borderWidth ? borderWidth : undefined}
        >
          {(showLabel && type === 'interval') && (
            <Label content={['key*value', (name, value) => value]} {...label} />
          )}
        </Geom>
      </Chart>
    </div>
  )
};

BarChart.defaultProps = {
  height: 400,
  type: 'interval',
  direction: 'vertical',
  titlePosition: 'left',
  titleMap: {},
  mini: false,
  showLabel: false,
  padding: 'auto'
};

export default BarChart;

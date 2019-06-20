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
  AxisProps
} from 'bizcharts';
import { TPadding} from '../pie';

const prefixCls = 'rc-bar-chart';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface IBarProps {
  className?: string;
  style?: React.CSSProperties;
  // 图标内边距
  padding?: TPadding;
  height?: number;
  data: IDataItem[];
  color?: string;
  // 层叠 或 分组柱状图 颜色
  colors?: string[];
  title?: string | React.ReactNode;
  titleMap?: {
    [key: string]: any;
  };
  // 是否显示Label
  //
  showLabel?: boolean;
  // 是否显示图例
  showLegend?: boolean;
  // x轴相关配置
  xAxis?: AxisProps;
  // y轴相关配置
  yAxis?: Partial<AxisProps>;
  // 柱状图类型
  // interval: 柱状图; intervalStack: 堆叠柱状图;
  type?: 'intervalStack' | 'interval';
  // 柱状图方向
  direction?: 'horizontal' | 'vertical'
  borderWidth?: number;
  legendPosition?: string;
}

const timeScale = {
  type: 'time',
  tickInterval: 60 * 60 * 1000,
  mask: 'HH:mm',
  range: [0, 1],
};

const cols = {
  x: timeScale,
  value: {
    min: 0,
  }
};

const BarChart: React.FC<IBarProps> = (props) => {
  const {
    className,
    type,
    style,
    title,
    height,
    xAxis,
    yAxis,
    showLabel,
    showLegend,
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
      {title && (<h4>{title}</h4>)}
      <Chart
        height={height}
        padding={padding}
        data={chartData}
        forceFit
      >
        {/* x轴 */}
        <Axis key="axis-x" name="x" {...xAxis} />
        {/* y轴 */}
        <Axis key="axis-y" name="value" { ...yAxis } />
        <Coord transpose={direction === 'horizontal'} />
        <Tooltip />
        {showLegend && (
          <Legend name="key" position="top" />
        )}
        <Geom
          type={type}
          position="x*value"
          size={borderWidth} color="key"
        >
          {(showLabel && type === 'interval') && (
            <Label content={['key*value', (name, value) => value]} />
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
  borderWidth: 20,
  padding: [60, 20, 40, 40],
  titleMap: {},
  showLabel: false
};

export default BarChart;

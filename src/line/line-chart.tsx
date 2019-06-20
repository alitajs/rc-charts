import React from 'react';
import classNames from 'classnames';
import { isArray } from 'awe-utils';
import { DataView } from '@antv/data-set';
import { Chart, Tooltip, Geom, Legend, Axis, LegendProps } from 'bizcharts';
import { TPadding} from '../pie';

const prefixCls = 'rc-line-chart';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface ILineChartProps {
  className?: string;
  style?: React.CSSProperties;
  padding?: TPadding;
  height?: number;
  colors?: string[];
  data: IDataItem[];
  title?: string | React.ReactNode;
  titleMap?: {
    [key: string]: any;
  };
  // 图例配置
  legend?: LegendProps;
  borderWidth?: number;
  legendPosition?: string;
}

const LineChart: React.FC<ILineChartProps> = (props) => {
  const {
    className,
    style,
    title,
    height,
    padding,
    titleMap,
    legend,
    colors,
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

  const cols = {
    x: {
      type: 'linear',
      tickInterval: 50,
    },
  };

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
        scale={cols}
        forceFit
      >
        {/* x轴 */}
        <Axis key="axis-x" name="x" />
        {/* y轴 */}
        <Axis key="axis-y" name="value" />
        <Tooltip />
        <Legend name="key" position="top" {...legend} />

        <Geom
          type="line"
          position="x*value"
          size={borderWidth}
          color={
            colors ? ['x', colors] : 'key'
          }
        />
      </Chart>
    </div>
  )
};

LineChart.defaultProps = {
  height: 400,
  borderWidth: 2,
  padding: [60, 20, 40, 40],
  titleMap: {}
};

export default LineChart;

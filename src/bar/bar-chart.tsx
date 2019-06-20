import React from 'react';
import classNames from 'classnames';
import { isArray } from 'awe-utils';
import { DataView } from '@antv/data-set';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import { TPadding} from '../pie';

const prefixCls = 'rc-bar-chart';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface IBarProps {
  className?: string;
  style?: React.CSSProperties;
  padding?: TPadding;
  height?: number;
  data: IDataItem[];
  title?: string | React.ReactNode;
  titleMap?: {
    [key: string]: any;
  };
  type?: 'intervalStack' | 'interval';
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
        <Axis name="x" />
        <Axis name="value" />
        <Coord transpose={direction === 'horizontal'} />
        <Tooltip />
        <Legend name="key" position="top" />
        <Geom
          type={type}
          position="x*value"
          size={borderWidth} color="key"
        />
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
  titleMap: {}
};

export default BarChart;

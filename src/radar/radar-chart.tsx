import React from 'react';
import classNames from 'classnames';
import {
  Chart,
  Tooltip,
  Geom,
  Coord,
  Axis,
  Legend,
  LegendProps,
  AxisProps
} from 'bizcharts';
import { DataView } from '@antv/data-set';
import { isArray } from 'awe-utils';
import { TPadding } from '@/global';

const prefixCls = 'rc-line-chart';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface IRadarChartProps {
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
  legend?: LegendProps;
  borderWidth?: number;
  legendPosition?: string;
  cols?: {
    [key: string]: any;
  };
  radius?: number;
  xAxis?: AxisProps;
  // y轴相关配置
  yAxis?: Partial<AxisProps>;
  areas?:boolean;
}

const RadarChart: React.FC<IRadarChartProps> = (props) => {
  const {
    className,
    style,
    title,
    data: sourceData,
    height,
    titleMap,
    borderWidth,
    cols,
    colors,
    radius,
    xAxis,
    yAxis,
    areas,
    padding,
  } = props;

  const [chartData, setChartData] = React.useState(null);

  const data = isArray(sourceData) ? sourceData : [];

  React.useEffect(() => {
    if(isArray(sourceData)) {
      const item = sourceData[0];

      if (!item) return;

      const newKeys = Object.keys(item).filter(item => item !== 'x');

      const dv = new DataView();
      dv.source(data)
        .transform({
          type: 'map',
          callback(row) {
            const newRow = { ...row };
            newKeys.forEach(item => {
              newRow[titleMap[item]] = row[item];
            });
            return newRow;
          }
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
        scale={cols}
        forceFit
      >
        <Coord type="polar" radius={radius} />
        <Tooltip />
        <Legend />
        {/* x轴 */}
        <Axis
          key="axis-x"
          name='x'
          line={null}
          tickLine={null}
          grid={{
            lineStyle: {
              lineDash: null
            },
            hideFirstLine: false
          }}
          {...xAxis}
        />
        {/* y轴 */}
        <Axis
          key="axis-y"
          name='value'
          line={null}
          tickLine={null}
          grid={{
            type: 'polygon',
            lineStyle: {
              lineDash: null
            },
            alternateColor: "rgba(0, 0, 0, 0.04)"
          }}
          {...yAxis}
        />
        <Geom
          type='line'
          position='x*value'
          size={borderWidth}
          color={colors.length ? ['key', colors] : 'key'}
        />
        <Geom
          type='point'
          position='x*value'
          size={4}
          shape='circle'
          color={colors.length ? ['key', colors] : 'key'}
        />
        {areas ?
          <Geom
            type='area'
            position='x*value'
            color={colors.length ? ['key', colors] : 'key'}
          /> :
          ''
        }
      </Chart>
    </div>
  )
};

RadarChart.defaultProps = {
  height: 400,
  borderWidth: 2,
  titleMap: {},
  data: [],
  colors: [],
  radius: 1,
  xAxis: {},
  yAxis: {},
  areas: true,
  padding: 'auto',
};

export default RadarChart;





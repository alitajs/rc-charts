import React from 'react';
import { isArray } from 'awe-utils';
import classNames from 'classnames';
import { DataView } from '@antv/data-set';
import { Axis, Chart, Geom, AxisProps, Legend, LegendProps } from 'bizcharts';
import { TPadding } from '@/global';
import './area-chart.less';

export interface IDataItem {
  x: any;
  [key: string]: number;
}

export interface IAreaProps {
  className?: string;
  title?: string | React.ReactNode;
  style?: React.CSSProperties;
  colors?: string[];
  height?: number;
  padding?: TPadding;
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
  isStack: boolean;
  // 图例配置
  legend?: LegendProps;
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: IDataItem[];
  titleMap?: {
    [key: string]: any;
  };
  // 是否平滑
  // 默认为false
  smooth: boolean;
}

const prefixCls = 'rc-area-chart';

const AreaChart: React.FC<IAreaProps> = (props) => {
  const {
    className,
    title,
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
    titleMap,
    smooth,
    padding,
    borderWidth,
    data: sourceData
  } = props;
  const [chartData, setChartData] = React.useState(null);

  const data = isArray(sourceData) ? sourceData : [];

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
      {title && (<h4>{title}</h4>)}
      <Chart
        height={height}
        data={chartData}
        scale={scale}
        padding={padding}
        animate={animate}
        forceFit={forceFit}
      >
        {/** x轴 */}
        <Axis name="x" title {...xAxis} />

        {/** y轴 */}
        <Axis name="value" title {...yAxis} />

        {/** 图例 */}
        <Legend {...legend}/>

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
  padding: 'auto'
};

export default AreaChart;

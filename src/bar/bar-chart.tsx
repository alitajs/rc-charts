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
  Guide,
  AxisProps,
  LabelProps,
  LegendProps,
  TooltipProps
} from 'bizcharts';
import Title, { TPosition } from '../components/title';
import { TPadding, ILineProps } from '@/global';
import { sum } from '../utils/utils';

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
  // 均值线配置
  meanLine?: ILineProps;
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

const { Line } = Guide;

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
    meanLine,
    showLabel,
    legend,
    padding,
    direction,
    titleMap,
    borderWidth,
    data: sourceData,
  } = props;
  const [chartData, setChartData] = React.useState(null);
  // 均值存储
  const [means, setMeans] = React.useState<{
    value: number,
    text: string,
  }[]>([]);

  const data = isArray(sourceData) ? sourceData : [];

  React.useEffect(() => {
    if (isArray(sourceData)) {
      const item = sourceData[0];

      if (!item) return;

      const newKeys = Object.keys(item).filter(item => item !== 'x');

      if (meanLine) {
        // 计算均值
        const means = newKeys.map(key => {
          const numbers = data.map((item, index) => data[index][key]);
          return {
            value: (sum(numbers as any) / numbers.length).toFixed(0),
            text: titleMap[key] || key
          };
        });

        setMeans(means as any);
      }

      // 组织图表数据
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
  }, [props.data, props.meanLine]);

  const renderMeanLine = () => {
    if (meanLine && means.length) {
      return (
        <Guide>
          {means.map((item, index) => {
            const start = ['start', item.value];
            const end = ['end', item.value];

            return (
              <Line
                top={true}
                key={index}
                start={start}
                end={end}
                lineStyle={{
                  stroke: '#595959',
                  lineWidth: 1,
                  lineDash: [3, 3]
                }}
                text={{
                  position: 'start',
                  style: {
                    fill: '#595959',
                    fontSize: 12,
                    fontWeight: 300
                  },
                  content: `${means.length === 1 ? '' : item.text}均值线`
                }}
                {...meanLine}
              />
            )
          })}
        </Guide>
      )
    } else {
      return null;
    }
  };

  const meanLineMemo = React.useMemo(() => {
    return renderMeanLine();
  }, [props.meanLine, props.data, means]);

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

        {/** 图例 */}
        {!mini && (
          <Legend name="key" position="top" {...legend} />
        )}

        {/** 均值线 */}
        {meanLineMemo}

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

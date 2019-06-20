import React from 'react';
import classNames from 'classnames';
import { Axis, Chart, Geom, Tooltip, AxisProps } from 'bizcharts';
import { TPadding} from '../pie';

export interface IAreaProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  height?: number;
  padding?: TPadding;
  borderColor?: string;
  // 是否显示线
  // 默认显示
  line?: boolean;
  // 图表动画开关，默认为 true，即开启动画。
  animate?: boolean;
  xAxis?: AxisProps;
  // 是否开启自适应
  forceFit?: boolean;
  scale?: any;
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: {
    x: number | string;
    y: number;
  }[];
  // 是否平滑
  // 默认为false
  smooth: boolean;
}

const prefixCls = 'rc-area-chart';

const AreaChart: React.FC<IAreaProps> = (props) => {
  const {
    className,
    style,
    animate,
    forceFit,
    height,
    scale,
    data,
    xAxis,
    yAxis,
    color,
    line,
    smooth,
    padding,
    borderColor,
    borderWidth
  } = props;

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Chart
        animate={animate}
        scale={scale}
        height={height}
        forceFit={forceFit}
        data={data}
        padding={padding}
      >
        <Axis
          key="axis-x"
          name="x"
          {...xAxis}
        />
        <Axis
          key="axis-y"
          name="y"
          {...yAxis}
        />
        <Tooltip showTitle={false} crosshairs={false} />
        <Geom
          type="area"
          position="x*y"
          color={color}
          tooltip={tooltip}
          shape={smooth ? 'smooth' : ''}
          style={{
            fillOpacity: 1,
          }}
        />
        {line ? (
          <Geom
            type="line"
            position="x*y"
            shape={smooth ? 'smooth' : ''}
            color={borderColor}
            size={borderWidth}
            tooltip={false}
          />
        ) : (
          <span style={{ display: 'none' }} />
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
  color: 'rgba(24, 144, 255, 0.2)',
  borderColor: '#1089ff',
  borderWidth: 2,
  scale: { x: {}, y: {} },
  data: [],
  padding: 'auto'
};

export default AreaChart;

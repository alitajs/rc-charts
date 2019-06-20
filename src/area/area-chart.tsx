import React from 'react';
import classNames from 'classnames';
import { Axis, Chart, Geom, Tooltip, AxisProps } from 'bizcharts';

export interface IAreaProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: AxisProps;
  forceFit?: boolean;
  scale?: {
    x?: {
      tickCount?: number;
    };
    y?: {
      tickCount?: number;
    };
  };
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: {
    x: number | string;
    y: number;
  }[];
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
    borderColor,
    borderWidth
  } = props;

  const scaleProps = {
    x: {
      type: 'cat',
      range: [0, 1],
      ...scale.x,
    },
    y: {
      min: 0,
      ...scale.y,
    },
  };

  const test = [
    {x: '2019-06-20', y: 7},
    {x: '2019-06-21', y: 5},
    {x: '2019-06-22', y: 4},
    {x: '2019-06-23', y: 2},
    {x: '2019-06-24', y: 4},
    {x: '2019-06-25', y: 7},
    {x: '2019-06-26', y: 5},
    {x: '2019-06-27', y: 6},
    {x: '2019-06-28', y: 5}
  ];

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  const padding: [number, number, number, number] = [36, 5, 30, 5];

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Chart
        animate={animate}
        scale={scaleProps}
        height={height}
        forceFit={forceFit}
        data={data}
        padding={padding}
      >
        <Axis
          key="axis-x"
          name="x"
          label={null}
          line={null}
          tickLine={null}
          grid={null}
          {...xAxis}
        />
        <Axis
          key="axis-y"
          name="y"
          label={null}
          line={null}
          tickLine={null}
          grid={null}
          {...yAxis}
        />
        <Tooltip showTitle={false} crosshairs={false} />
        <Geom
          type="area"
          position="x*y"
          color={color}
          tooltip={tooltip}
          shape="smooth"
          style={{
            fillOpacity: 1,
          }}
        />
        {line ? (
          <Geom
            type="line"
            position="x*y"
            shape="smooth"
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
  animate: true,
  forceFit: true,
  color: 'rgba(24, 144, 255, 0.2)',
  borderColor: '#1089ff',
  borderWidth: 2,
  scale: { x: {}, y: {} },
  data: []
};

export default AreaChart;

import React from 'react';
import classNames from 'classnames';
import { G2, Chart, Tooltip, Geom, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';
import FitText from 'rc-fit-text';
import './pie-chart.less';

const prefixCls = 'rc-pie-chart';

interface IDataItem {
  x: string;
  y: number;
}

export type TPadding =
  string
  | {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  | number
  | [number, number, number, number]
  | [string, string];

export interface IProps {
  className?: string;
  style?: React.CSSProperties;
  // 图表动画开关，默认为 true
  animate?: boolean;
  color?: string;
  colors?: string[];
  selected?: boolean;
  // 指定图表的高度，单位为 'px'
  height?: number;
  hasLegend?: boolean;
  // 图表内边距
  padding?: TPadding;
  data?: IDataItem[];
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  // 是否显示tooltip
  tooltip?: boolean;
  // 内部极坐标系的半径，[0-1]的小数
  innerRadius?: number;
  lineWidth?: number;
  // 百分比显示
  percent?: number;
  // 图表的宽度自适应开关
  forceFit?: boolean;
  valueFormat?: (value: string) => string | React.ReactNode;
  // 获取 chart 实例的回调
  onGetG2Instance?: (chart: G2.Chart) => void;
}

export interface ILegendDataItem {
  checked: boolean;
  x: string;
  color: string;
  percent: number;
  y: string;
}

const scale = {
  x: {
    type: 'cat',
    range: [0, 1],
  },
  y: {
    min: 0,
  },
};

let chartInstance: G2.Chart = null;
let requestRef = null;

const PieChart: React.FC<IProps> = (props) => {
  const {
    className,
    style,
    height,
    forceFit,
    padding,
    animate,
    percent,
    color,
    colors,
    title,
    subTitle,
    total,
    hasLegend,
    valueFormat,
    innerRadius,
    lineWidth,
    onGetG2Instance
  } = props;
  const rootRef = React.useRef(null);
  const [legendBlock, setLegendBlock] = React.useState<boolean>(false);
  const [legendData, setLegendData] = React.useState<ILegendDataItem[]>([]);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      requestRef = requestAnimationFrame(() => resize());
    }, { passive: true })
  }, []);

  React.useEffect(() => {
    console.log('******');
    getLegendData();
  }, [props.data]);

  const handleGetG2Instance = (chart: G2.Chart) => {
    chartInstance = chart;
    onGetG2Instance && onGetG2Instance(chart);
  };

  // 用于自定义图例
  const getLegendData = () => {
    if (!chartInstance) return;
    const geom = chartInstance.getAllGeoms()[0];
    if (!geom) return;
    // @ts-ignore
    const items = geom.get('dataArray') || [];

    const data = items.map((item: { color: any; _origin: any }[]) => {
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      return origin;
    });

    setLegendData(data);
  };

  const handleLegendClick = (item: any, i: string | number) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    const newLegendData = [...legendData];
    newLegendData[i] = newItem;

    const filteredLegendData = newLegendData.filter(l => l.checked).map(l => l.x);

    if (chartInstance) {
      chartInstance.filter('x', val => filteredLegendData.indexOf(val + '') > -1);
    }

    setLegendData(newLegendData);
  };

  const resize = () => {
    const root: HTMLDivElement = rootRef.current;

    if (!hasLegend || !root) {
      window.removeEventListener('resize', resize);
      return;
    }

    if (
      root &&
      root.parentNode &&
      (root.parentNode as HTMLElement).clientWidth <= 380
    ) {
      if (!legendBlock) {
        setLegendBlock(true);
      }
    } else {
      setLegendBlock(false);
    }
  };

  const tooltipFormat: [
    string,
    (...args: any[]) => { name?: string; value: string }
    ] = [
    'x*percent',
    (x: string, p: number) => ({
      name: x,
      value: `${(p * 100).toFixed(2)}%`,
    }),
  ];

  const defaultColors = colors;
  let formatColor;
  let data = props.data || [];
  let tooltip = props.tooltip;
  let selected = props.selected;

  if (percent || percent === 0) {
    selected = false;
    tooltip = false;
    formatColor = (value: string) => {
      if (value === '占比') {
        return color || 'rgba(24, 144, 255, 0.85)';
      }
      return '#F0F2F5';
    };

    data = [
      {
        x: '占比',
        y: parseFloat(percent + ''),
      },
      {
        x: '反比',
        y: 100 - parseFloat(percent + ''),
      },
    ];
  }

  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'y',
    dimension: 'x',
    as: 'percent',
  });


  return (
    <div
      ref={rootRef}
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`show-legend`]: !!hasLegend,
        ['legend-block']: legendBlock
      })}
      style={style}
    >
      <FitText maxFontSize={25}>
        <div className={`${prefixCls}__chart`}>
          <Chart
            scale={scale}
            height={height}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
            onGetG2Instance={handleGetG2Instance}
          >
            {/** 提示信息(tooltip)组件 */}
            {!!tooltip && <Tooltip showTitle={false} />}
            {/** 坐标系组件 */}
            <Coord type="theta" innerRadius={innerRadius} />
            <Geom
              style={{ lineWidth, stroke: '#fff' }}
              tooltip={tooltip ? tooltipFormat : undefined}
              type="intervalStack"
              position="percent"
              color={
                [
                  'x',
                  percent || percent === 0 ? formatColor : defaultColors,
                ] as any
              }
              selected={selected}
            />
          </Chart>

          {(subTitle || total) && (
            <div className={`${prefixCls}__content`}>
              {title && (
                <h5>{title}</h5>
              )}
              {total && (
                <p>
                  {typeof total === 'function' ? total() : total}
                </p>
              )}
              {subTitle && <h5>{subTitle}</h5>}
            </div>
          )}
        </div>
      </FitText>

      {hasLegend && (
        <ul className={`${prefixCls}__legend`}>
          {legendData.map((item, i) => (
            <li key={item.x} onClick={() => handleLegendClick(item, i)}>
              <span
                className={`${prefixCls}__dot`}
                style={{
                  backgroundColor: !item.checked ? '#aaa' : item.color,
                }}
              />
              <span className={`${prefixCls}__legend-title`}>
                {item.x}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

PieChart.defaultProps = {
  animate: true,
  forceFit: true,
  hasLegend: false,
  height: 400,
  innerRadius: 0.75,
  lineWidth: 1,
  padding: [12, 0, 12, 0]
};

export default PieChart;

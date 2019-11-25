import React from 'react';
import classNames from 'classnames';
import {
  G2,
  Chart,
  Tooltip,
  Geom,
  Coord,
  Label,
  LabelProps,
  LegendProps, Legend
} from 'bizcharts';
import { DataView } from '@antv/data-set';
import FitText from 'rc-fit-text';
import { Padding } from '../types';
import './pie-chart.less';

export interface DataItem {
  x: string;
  y: number;
}

interface LegendDataItem {
  x: string;
  y: string;
  checked: boolean;
  color: string;
  percent: number;
}

export interface PieProps {
  className?: string;
  style?: React.CSSProperties;
  //
  type?: 'polar' | 'theta';
  // 图表动画开关，默认为 true
  animate?: boolean;
  color?: string;
  colors?: string[];
  selected?: boolean;
  // 指定图表的高度，单位为 'px'
  height?: number;
  // 图表内边距
  padding?: Padding;
  data: DataItem[];
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  // 是否开启自动计算总数
  autoTotal?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  // 图例配置
  legend?: LegendProps;
  // 是否显示Label
  showLabel?: boolean;
  // 标注文本
  label?: LabelProps;
  // 详细图例显示开关
  hasLegend?: boolean;
  valueFormat?: (value: string) => string | React.ReactNode;
  titleMap?: {
    [key: string]: any;
  };
  // 是否显示tooltip
  tooltip?: boolean;
  // 设置半径，[0-1]的小数
  radius?: number;
  // 内部极坐标系的半径，[0-1]的小数
  innerRadius?: number;
  lineWidth?: number;
  // 百分比显示
  percent?: number;
  // 图表的宽度自适应开关
  forceFit?: boolean;
  // 获取 chart 实例的回调
  onGetG2Instance?: (chart: G2.Chart) => void;
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

const defaultScale = {
  x: {
    type: 'cat',
    range: [0, 1],
  },
  y: {
    min: 0,
  }
};

const PieChart: React.FC<PieProps> = (props) => {
  let chartInstance: G2.Chart = null;
  let requestRef = null;
  const prefixCls = 'rc-pie-chart';
  const rootRef = React.useRef(null);
  const {
    className,
    style,
    type,
    height,
    forceFit,
    padding,
    animate,
    percent,
    color,
    colors,
    title,
    subTitle,
    hasLegend,
    valueFormat,
    label,
    showLabel,
    total,
    autoTotal,
    radius,
    legend,
    innerRadius,
    lineWidth,
    onGetG2Instance
  } = props;
  const [innerWidth, setInnerWidth] = React.useState<number>(0);
  const [legendBlock, setLegendBlock] = React.useState<boolean>(false);
  const [legendData, setLegendData] = React.useState<LegendDataItem[]>([]);
  const [totalNumber, setTotalNumber] = React.useState<number>(0);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      requestRef = requestAnimationFrame(() => resize());
    }, { passive: true })
  }, []);

  React.useEffect(() => {
    let newTotal = 0;
    if (autoTotal) {
      data.forEach(item => {
        if (item.y) {
          newTotal += item.y;
        }
      })
    } else {
      newTotal = typeof total === 'function' ? total() : total
    }
    setTotalNumber(newTotal);
  }, [props.total, props.autoTotal, props.data]);

  React.useEffect(() => {
    getLegendData();
  }, [props.data]);

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

  const handleGetG2Instance = (chart: G2.Chart) => {
    chartInstance = chart;
    setInnerWidth(chart.get('height') * innerRadius);
    onGetG2Instance && onGetG2Instance(chart);
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

  const cols = Object.assign({}, defaultScale, scale);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`show-legend`]: !!hasLegend,
        ['legend-block']: legendBlock
      })}
      ref={rootRef}
      style={style}
    >
      <div className={`${prefixCls}__chart`}>
        <Chart
          scale={type === 'theta' ? cols : undefined}
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
          <Coord
            type={type}
            radius={radius}
            innerRadius={innerRadius}
          />

          {/** 图例 */}
          <Legend {...legend}/>

          <Geom
            style={{ lineWidth, stroke: '#fff' }}
            tooltip={tooltip ? tooltipFormat : undefined}
            type={type === 'theta' ? 'intervalStack' : 'interval'}
            position={type === 'theta' ? 'percent' : 'x*percent'}
            color={
              [
                'x',
                percent || percent === 0 ? formatColor : defaultColors,
              ]
            }
            selected={selected}
          >
            {showLabel && (
              <Label content='percent' {...label}/>
            )}
          </Geom>
        </Chart>
        <FitText>
          <div
            className={`${prefixCls}__content`}
            style={{
              marginTop: (legend && legend.visible)
                ? -innerWidth * 0.1
                : 0,
              width: innerWidth,
              height: +innerWidth,
              padding: innerWidth * 0.1
            }}
          >
            <div>
              {title && (
                <h4>{title}</h4>
              )}
              {(total || autoTotal) && (
                <p>{totalNumber}</p>
              )}
              {subTitle && <h5>{subTitle}</h5>}
            </div>
          </div>
        </FitText>
      </div>

      {hasLegend && (
        <ul className={`${prefixCls}__legend`}>
          {legendData.map((item, i) => (
            <li key={item.x} onClick={() => handleLegendClick(item, i)}>
              <div className="title">
                <span
                  className="dot"
                  style={{
                    backgroundColor: !item.checked ? '#aaa' : item.color,
                  }}
                />
                <span>{item.x}</span>
              </div>
              <div className="value">
                <span className="value">{valueFormat ? valueFormat(item.y) : item.y}</span>
              </div>
              <div className="percent">
                <span className="percent">
                  {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};

PieChart.defaultProps = {
  type: 'theta',
  animate: true,
  forceFit: true,
  hasLegend: false,
  showLabel: false,
  height: 400,
  radius: 1,
  innerRadius: 0,
  lineWidth: 1,
  legend: {
    visible: false
  },
  data: [],
  padding: 'auto',
  autoTotal: false
};

export default PieChart;

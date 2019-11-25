import React from 'react';
import isArray from '@pansy/is-array';
import classNames from 'classnames';
import { DataView } from '@antv/data-set';
import {
  G2,
  Chart,
  Tooltip,
  Geom,
  Coord,
  Axis,
  Legend,
  View,
  Guide,
  Label,
  LegendProps,
  TooltipProps,
} from 'bizcharts';
import { Padding } from '../types';
import Title, { Position } from '../components/title';

const { Text } = Guide;

export interface DataItem {
  x: number | string;
  [key: string]: number | string;
}

export interface FunnelProps {
  className?: string;
  style?: React.CSSProperties;
  padding?: Padding;
  height?: number;
  colors?: string[];
  y2colors?: string[];
  data: DataItem[];
  title?: string ;
  titlePosition?: Position;
  legend?: LegendProps;
  tooltip?: TooltipProps;
  transpose?: boolean;
  unInvert?: boolean;
  guideText?: {
    [key: string]: any;
  };
  labelText?: {
    [key: string]: any;
  };
  isSharp?: boolean;
  tooltipMap?: {
    [key: string]: any;
  }
}

const prefixCls = 'rc-line-chart';

const FunnelChart: React.FC<FunnelProps> = (props) => {
  const {
    className,
    style,
    data,
    height,
    padding,
    colors,
    y2colors,
    // 是否为竖着的状态，如果为false:横着，默认为 true
    transpose,
    // 是否为倒立状态，如果为false: 小头朝上，默认为 true
    unInvert,
    // 显示在漏斗图上的文字以及样式
    guideText,
    // 是否展示右边的文字以及样式修订
    labelText,
    // 是否为尖底
    isSharp,
    // tolltip 所显示的自定义名称
    tooltipMap,
    legend,
    tooltip,
    title,
    titlePosition,
  } = props;

  const [yFlag, setYFlag] = React.useState(false);

  const [chartData, setChartData] = React.useState([{x: '', percent: 0}]);
  React.useEffect(() => {
    if(isArray(data)) {
      const item = data[0];
      if(!item) return;

      if(item.y2) {
        setYFlag(true);
      }

      const dv = new DataView().source(data);
      dv.transform({
        type: "percent",
        field: "y1",
        dimension: "x",
        as: "percent"
      });
      setChartData(dv.rows);
    }
  }, [props.data]);


  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <Title
        position={titlePosition}
        text={title}
      />
      <Chart
          height={height}
          data={chartData}
          forceFit
          padding={padding}
        >
          <Tooltip
            showTitle={false}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}<br/></li>"
            {...tooltip}
          />
          <Coord type='rect' transpose={props.transpose ? true : false} scale={unInvert ? [1, -1] : [-1, 1]} />
          <Legend {...legend} />
          {
            guideText.show ?
            <Guide>
              {chartData.map((item, index) => {
                return (
                  <Text
                    key={index}
                    top={true}
                    position={{
                      x: item.x,
                      y1: "median"
                    }}
                    content={(item.percent * 100).toFixed(0) + '%'}
                    style={{
                      fill: guideText.color,
                      fontSize: guideText.fontSize,
                      textAlign: guideText.textAlign,
                      shadowBlur: 2,
                      shadowColor: "rgba(0, 0, 0, .45)"
                    }}
                  />
                )
              })}
            </Guide>
            : ''
          }
          <Geom
            type='intervalSymmetric'
            position='x*y1'
            shape={isSharp ? 'pyramid' : 'funnel'}
            color={['x', colors]}
            tooltip={[
              "x*y1*percent",
              (x, y1, percent) => {
                return {
                  name: tooltipMap.y1 ? tooltipMap.y1 : x,
                  value: y1,
                  percent: (parseInt(percent) * 100).toFixed(0)  + "%",
                }
              }
            ]}
          >
            {
              labelText.show ?
              <Label
                content={[
                  "x*y1",
                  (x, y1) => {
                    if(labelText.showValue) {
                      return x + " " + y1;
                    } else {
                      return x;
                    }

                  }
                ]}
              /> : ''
            }
          </Geom>
          {
            yFlag ?
            <View data={data}>
              <Geom
                type="intervalSymmetric"
                position="x*y2"
                shape="pyramid"
                opacity={0.65}
                color={[
                  "x",
                  y2colors
                ]}
                tooltip={[
                  'x*y2',
                  (x, y2) => {
                    return {
                      name: tooltipMap.y2 ? tooltipMap.y2 : x,
                      value: y2,
                    }
                  }
                ]}
              />
            </View> : ''
          }
        </Chart>
    </div>
  )
}

FunnelChart.defaultProps = {
  data: [],
  height: 400,
  padding: 'auto',
  colors: [],
  y2colors: [],
  transpose: true,
  unInvert: true,
  isSharp: false,
  tooltipMap: {},
  guideText: {
    show: false,
    fontSize: '12',
    color: '#fff',
  },
  labelText: {
    show: false,
    showValue: false,
    offsetX: 35,
    offsetY: 35,
  },
};

export default FunnelChart;










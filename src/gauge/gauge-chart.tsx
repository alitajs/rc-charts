import React from 'react';
import {
  Chart,
  Axis,
  Coord,
  Geom,
  Guide,
  Shape
} from 'bizcharts';
import FitText from 'rc-fit-text';
import { TPadding } from '../global';
import { number } from 'prop-types';
import Title, { TPosition } from '../components/title';

const { Html, Arc, Line } = Guide;


// 自定义Shape 部分
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

export interface IGaugeProps {
  title?: string,
  titlePosition?: TPosition;
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  padding?: TPadding;
  forceFit?: boolean;
  data?: {
    value: number;
  }[];
  valueSection: {
    min: number;
    max: number;
  }[];
  tickInterval: number;
  lineColor: string,
  ticks?: {
    num: number;
    text: string;
  }[];
  scaleLine?: {
    num: number,
    color: string,
    lineWidth: number,
  }[],
  scaleArea?: [],
  subTitle?: string,
  scaleSize?: number,
  labelFontSize?: number,
  labelColor?: string,
}

const GaugeChart: React.FC<IGaugeProps> = (props) => {
  const { 
    height, 
    padding, 
    forceFit, 
    data,
    valueSection,
    tickInterval,
    lineColor,
    ticks,
    scaleLine,
    subTitle,
    scaleSize,
    titlePosition,
    title,  
    labelFontSize,
    labelColor,
   } = props;

   let { scaleArea=[] } = props;

  const val = data[0].value;

  let ticksNum = [];
  ticks.map(item => {
    ticksNum.push(item[`num`]);
  });

  const cols1 = {
    value: {
      min: valueSection[`min`],
      max: valueSection[`max`],
      tickInterval: tickInterval,
      nice: false,
    },
  };
  const cols2 = {
    value: {
      min: valueSection[`min`],
      max: valueSection[`max`],
      ticks: ticksNum,
      nice: false,
    },
  };


  if(scaleArea.length === 0) {
    let obj = {};
    obj[`min`] = valueSection[`min`];
    obj[`max`] = valueSection[`max`];
    obj[`color`] = `#19AFFA`;
    scaleArea.push(obj);
  }

  return (
    <div>
      <Title
        position={titlePosition}
        text={title}
      />
      <Chart
        height={height}
        data={data}
        scale={ticksNum.length ? cols2 : cols1}
        padding={padding}
        forceFit
      >
        {/** 极坐标系组件 */}
        <Coord
          type="polar"
          startAngle={-9 / 8 * Math.PI}
          endAngle={1 / 8 * Math.PI}
          radius={0.75}
        />

        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={ticksNum.length ? 
            {
              offset: -20,
              formatter: (val) => {
                let value = '';
                ticks.map((item, index) => {
                  if(item[`num`].toString() === val) {
                    value = item[`text`];
                  }
                  return index;
                })
                return value;
              },
              textStyle: {
                fontSize: labelFontSize,
                fill: labelColor,
                textAlign: 'center',
              },
            } : {
            offset: -20,
            textStyle: {
              fontSize: labelFontSize,
              fill: labelColor,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          tickLine={{
            length: -24,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
        />

        <Axis name="1" visible={false} />

        <Guide>
          {
            scaleLine.map(item => {
              return (
                <Line
                  start={[item[`num`], 0.905]}
                  end={[item[`num`], 0.85]}
                  lineStyle={{
                    stroke: item[`color`], // 线的颜色
                    lineDash: null, // 虚线的设置
                    lineWidth: item[`lineWidth`],
                  }}
                />
              )
            })
          }
          <Arc
            // zIndex={0}
            start={[valueSection[`min`], 0.965]}
            end={[valueSection[`max`], 0.965]}
            style={{ // 底灰色
              stroke: 'rgba(0, 0, 0, 0.09)',
              lineWidth: scaleSize,
            }}
          />
          {
            scaleArea.map(item => {
              if(data[0].value > item[`max`]) {
                return (
                  <Arc
                    // zIndex={1}
                    start={[item[`min`], 0.965]}
                    end={[item[`max`], 0.965]}
                    style={{
                      stroke: item[`color`],
                      lineWidth: scaleSize,
                    }}
                  />
                )
              } else if(data[0].value > item[`min`] && data[0].value < item[`max`]) {
                return (
                  <Arc
                    // zIndex={1}
                    start={[item[`min`], 0.965]}
                    end={[data[0].value, 0.965]}
                    style={{
                      stroke: item[`color`],
                      lineWidth: scaleSize,
                    }}
                  />
                )
              } else {
                return '';
              }
              
            })
          }
          <Html
            position={['50%', '95%']}
            html={`${subTitle}`}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color={lineColor}
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />

      </Chart>

    </div>
  )
};

GaugeChart.defaultProps = {
  height: 400,
  padding: 'auto',
  forceFit: true,
  tickInterval: 1,
  lineColor: '#1890FF',
  ticks: [],
  scaleLine: [],
  scaleArea: [],
  subTitle: '<div></div>',
  scaleSize: 18,
  labelFontSize: 20,
  labelColor: '#CBCBCB',
};

// CDN END
export default GaugeChart;

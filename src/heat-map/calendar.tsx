import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Shape,
  Util,
  AxisProps
} from 'bizcharts';
import { TPadding } from '@/global';
import { getChartData } from './utils';

export interface IData {
 [key: string]: number;
}

interface IProps {
  // 时间范围
  range?: string | string[];
  animate?: boolean;
  height?: number;
  forceFit?: boolean;
  colors?: string;
  weekAxis?: AxisProps;
  dayAxis?: AxisProps;
  padding?: TPadding;
  borderWidth?: number;
  scale?: any;
  // 已周几为一周的开始
  weekStart: 1 | 7,
  // 数据
  data: IData
}

const defaultCols = {
  day: {
    type: 'cat',
    values: []
  },
  week: {
    type: 'cat'
  },
  commits: {
    sync: true
  }
};

export const Calendar: React.FC<IProps> = (props) => {
  const {
    scale,
    range,
    data,
    animate,
    colors,
    height,
    weekAxis,
    dayAxis,
    padding,
    forceFit,
    weekStart,
    borderWidth
  } = props;
  const [chartData, setChartData] = React.useState<any>([]);
  const [months, setMonths] = React.useState<any>([]);
  const [cols, setCols] = React.useState<any>(defaultCols);

  if (weekStart === 1) {
    defaultCols.day.values = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  } else {
    defaultCols.day.values = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  }

  React.useEffect(() => {
    const result = getChartData(range, data, weekStart);
    setChartData(result.data);
    setMonths(result.months);
    console.log(result.months);
  }, [props.range, props.data]);

  React.useEffect(() => {
    if (!scale) return;
    setCols(Object.assign({}, defaultCols, scale));
  }, [props.scale, props.weekStart]);

  Shape.registerShape('polygon', 'boundary-polygon', {
    draw(cfg, container) {
      if (!Util.isEmpty(cfg.points)) {
        const attrs = {
          stroke: '#fff',
          lineWidth: borderWidth,
          fill: cfg.color,
          fillOpacity: cfg.opacity
        };
        const points = cfg.points;
        const path = [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          ['L', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
          ['Z']
        ];
        attrs['path'] = this.parsePath(path);
        const polygon = container.addShape('path', {
          attrs
        });

        container.sort();
        return polygon;
      }
    }
  });

  return (
    <div>
      <Chart
        height={height}
        data={chartData}
        scale={cols}
        animate={animate}
        padding={padding}
        forceFit={forceFit}
      >
        <Tooltip title='date' />
        <Axis
          name="week"
          position="bottom"
          tickLine={null}
          line={null}
          label={{
            offset: 12,
            textStyle: {
              fontSize: 12,
              fill: '#666',
              textBaseline: 'top'
            },
            formatter: val => {
              if (val === '2') {
                return months[0];
              } else if (val === '6') {
                return months[1];
              } else if (val === '10') {
                return months[2];
              } else if (val === '15') {
                return months[3];
              } else if (val === '19') {
                return months[4];
              } else if (val === '24') {
                return months[5];
              } else if (val === '28') {
                return months[6];
              } else if (val === '33') {
                return months[7];
              } else if (val === '37') {
                return months[8];
              } else if (val === '42') {
                return months[9];
              } else if (val === '46') {
                return months[10];
              } else if (val === '51') {
                return months[11];
              }

              return '';
            },
          }}
          {...weekAxis}
        />
        <Axis
          name='day'
          {...dayAxis}
        />
        <Geom
          type="polygon"
          position='week*day*date'
          shape="boundary-polygon"
          color={colors ? ['value', colors] : 'value'}
        />
        <Coord reflect='y' />
      </Chart>
    </div>
  )
};

Calendar.defaultProps = {
  height: 400,
  animate: true,
  forceFit: true,
  borderWidth: 2,
  weekStart: 1,
  data: {}
};

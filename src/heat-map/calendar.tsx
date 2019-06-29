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
  height?: number;
  forceFit?: boolean;
  colors?: string;
  weekAxis?: AxisProps;
  dayAxis?: AxisProps;
  padding?: TPadding;
  borderWidth?: number;
  scale?: any;
  // 数据
  data: IData
}

const defaultCols = {
  day: {
    type: 'cat',
    values: [
      '周日',
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六'
    ]
  },
  week: {
    type: 'cat'
  },
  commits: {
    sync: true
  }
};

const CalendarHorizontal: React.FC<IProps> = (props) => {
  const {
    scale,
    range,
    data,
    colors,
    height,
    weekAxis,
    dayAxis,
    padding,
    forceFit,
    borderWidth
  } = props;
  const [chartData, setChartData] = React.useState<any>([]);
  const [cols, setCols] = React.useState<any>(defaultCols);

  React.useEffect(() => {
    setChartData(getChartData(range, data));
  }, [props.range, props.data]);

  React.useEffect(() => {
    if (!scale) return;
    setCols(Object.assign({}, defaultCols, scale));
  }, [props.scale]);

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
                return '五月';
              } else if (val === '6') {
                return '六月';
              } else if (val === '10') {
                return '七月';
              } else if (val === '15') {
                return '八月';
              } else if (val === '19') {
                return '九月';
              } else if (val === '24') {
                return '十月';
              }

              return '';
            },
          }}
          {...weekAxis}
        />
        <Axis
          name='day'
          grid={null}
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

CalendarHorizontal.defaultProps = {
  height: 400,
  borderWidth: 2
};

export default CalendarHorizontal;

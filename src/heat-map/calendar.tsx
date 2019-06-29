import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Shape,
  Util
} from 'bizcharts';
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
  // 数据
  data: IData
}

const cols = {
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
  const { range, data, colors } = props;
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    setChartData(getChartData(range, data));
  }, [props.range, props.data]);

  Shape.registerShape('polygon', 'boundary-polygon', {
    draw(cfg, container) {
      if (!Util.isEmpty(cfg.points)) {
        const attrs = {
          stroke: '#fff',
          lineWidth: 1,
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
        height={400}
        data={chartData}
        scale={cols}
        forceFit
      >
        <Tooltip title='date' />
        <Axis
          name="week"
          position="top"
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
                return 'MAY';
              } else if (val === '6') {
                return 'JUN';
              } else if (val === '10') {
                return 'JUL';
              } else if (val === '15') {
                return 'AUG';
              } else if (val === '19') {
                return 'SEP';
              } else if (val === '24') {
                return 'OCT';
              }

              return '';
            }
          }}
        />
        <Axis name='day' grid={null} />
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

export default CalendarHorizontal;

import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from 'bizcharts';

const HeatMapCalendar: React.FC = () => {
  Shape.registerShape('polygon', 'boundary-polygon', {
    draw(config, container) {
      if (!Util.isEmpty(config.points)) {
        const attrs = {
          stroke: '#fff',
          lineWidth: 1,
          fill: config.color,
          fillOpacity: config.opacity
        };

        const points = config.points;

        const path = [
          ['M', points[0].x, points[0].y],
          ['L', points[1].x, points[1].y],
          ['L', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
          ['Z']
        ];

        console.log(this);
      }
    }
  });
  return (
    <div>
      <Chart height={400}>
        <Geom
          type="polygon"
          position="week*day*date"
          shape="boundary-polygon"
          color={["commits", "#BAE7FF-#1890FF-#0050B3"]}
        />
      </Chart>
    </div>
  )
};

export default HeatMapCalendar;

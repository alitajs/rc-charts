import React from 'react';
import classNames from 'classnames';
import Chart from 'bizcharts/lib/components/Chart';
import FitText from 'rc-fit-text';

export type IPieType = 'polar' | 'theta';

export interface IPieProps {
  className?: string;
  style?: React.CSSProperties;
  // 图表的宽度自适应开关
  // 默认开启
  forceFit?: boolean;
}

const Pie: React.FC = () => {
  return (
    <div>
      123
    </div>
  )
};

Pie.defaultProps = {
  forceFit: true
};

export default Pie

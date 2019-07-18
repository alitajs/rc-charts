import React from 'react';
import classNames from 'classnames';
import { isArray } from 'awe-utils';
import { TPadding } from '../global';
import Title, { TPosition } from '../components/title';

import styles from './waterwave-chart.less';
import { string } from 'prop-types';

const prefixCls = 'rc-line-chart';

export interface IWaterWaveChartProps {
  height?: number;
  title?: string;
  titlePosition?: TPosition;
  percent?: number;
  color?: string;
  titleSize?: string;
  titleColor?: string;
  titleHeight?: string;
  percentColor?: string;
  percentSize?: string;
  percentHeight?: string;
}


const WaterWaveChart: React.FC<IWaterWaveChartProps> = (props) =>  {

  const {
    height,
    title,
    titlePosition,
    percent,
    color,
    titleSize,
    titleColor,
    titleHeight,
    percentColor,
    percentSize,
    percentHeight,
  } = props;

  var node: string;

  const [radio, setRadio] = React.useState(1);
  var root =  document.getElementById('root');
  const offsetWidth = document.getElementById('root').offsetWidth;
  // console.log(root);
  // console.log(root.parentNode);
  // console.log(offsetWidth);
  function resize () {
      setRadio(offsetWidth < height ? offsetWidth / height : 1);
  }

  function renderChart() {
    const data = percent / 100;
    const self = this;
    // cancelAnimationFrame(this.timer);
    const node = document.getElementById('canvas_id');
    console.log(node);
    if (node || (data !== 0 && !data)) {
      return;
    }

    const canvas = node;
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const radius = canvasWidth / 2;
    const lineWidth = 2;
    const cR = radius - lineWidth;

    ctx.beginPath();
    ctx.lineWidth = lineWidth * 2;

    const axisLength = canvasWidth - lineWidth;
    const unit = axisLength / 8;
    const range = 0.2;  // 振幅
    let currRange = range;
    const xOffset = lineWidth;
    let sp = 0;   // 周期偏移量
    let currData = 0;
    const waveupsp = 0.005; // 水波上涨速度

    let arcStack = [];
    const bR = radius - lineWidth;
    const circleOffset = -(Math.PI / 2);
    let circleLock = true;

    for(let i = circleOffset; i < circleOffset + 2 * Math.PI; i += 1 / (8 * Math.PI)) {
      arcStack.push([radius + bR * Math.cos(i), radius + bR * Math.sin(i)]);
    }

    const cStartPoint = arcStack.shift();
    ctx.strokeStyle = color;
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);

    function drawSin() {
      ctx.beginPath();
      ctx.save();

      const sinStack = [];
      for (let i = xOffset; i <= xOffset + axisLength; i += 20 / axisLength) {
        const x = sp + (xOffset + i) / unit;
        const y = Math.sin(x) * currRange;
        const dx = i;
        const dy = 2 * cR * (1 - currData) + (radius - cR) - unit * y;

        ctx.lineTo(dx, dy);
        sinStack.push([dx, dy]);
      }

      const startPoint = sinStack.shift();

      ctx.lineTo(xOffset + axisLength, canvasHeight);
      ctx.lineTo(xOffset, canvasHeight);
      ctx.lineTo(startPoint[0], startPoint[1]);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if (circleLock && type !== 'update') {
        if (arcStack.length) {
          const temp = arcStack.shift();
          ctx.lineTo(temp[0], temp[1]);
          ctx.stroke();
        } else {
          circleLock = false;
          ctx.lineTo(cStartPoint[0], cStartPoint[1]);
          ctx.stroke();
          arcStack = null;

          ctx.globalCompositeOperation = 'destination-over';
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.arc(radius, radius, bR, 0, 2 * Math.PI, 1);

          ctx.beginPath();
          ctx.save();
          ctx.arc(radius, radius, radius - 3 * lineWidth, 0, 2 * Math.PI, 1);

          ctx.restore();
          ctx.clip();
          ctx.fillStyle = color;
        }
      } else {
        if (data >= 0.85) {
          if (currRange > range / 4) {
            const t = range * 0.01;
            currRange -= t;
          }
        } else if (data <= 0.1) {
          if (currRange < range * 1.5) {
            const t = range * 0.01;
            currRange += t;
          }
        } else {
          if (currRange <= range) {
            const t = range * 0.01;
            currRange += t;
          }
          if (currRange >= range) {
            const t = range * 0.01;
            currRange -= t;
          }
        }
        if (data - currData > 0) {
          currData += waveupsp;
        }
        if (data - currData < 0) {
          currData -= waveupsp;
        }

        sp += 0.07;
        drawSin();
      }
      self.timer = requestAnimationFrame(render);
    }
    render();
  }

 

  React.useEffect(() => {
    renderChart();
    resize();
    window.addEventListener(
      'resize',
      () => {
        requestAnimationFrame(() => this.resize());
      },
      { passive: true }
    );
    if (props.percent !== percent) {
      // 不加这个会造成绘制缓慢
      this.renderChart('update');
    };

    return () => {
      // cancelAnimationFrame(this.timer);
      // if (this.node) {
      //   this.node.innerHTML = '';
      // }
      window.removeEventListener('resize', this.resize);
    }
  }, [props]);

  var _this = this;

  return (
    <div
      className={styles.waterWave}
      // ref={n => (this.root = n)}
      style={{ transform: `scale(${radio})` }}
    >
      <div style={{ width: height, height, overflow: 'hidden' }}>
        <canvas
          id={'canvas_id'}
          className={styles.waterWaveCanvasWrapper}
          // ref={n => (this.node = n)}
          // ref={n => (document.getElementById('canvas_id') = n)}
          width={height * 2}
          height={height * 2}
        />
      </div>
      <div className={styles.text} style={{ width: height }}>
          {title && <span>{title}</span>}
          <h4>{percent}%</h4>
      </div>
    </div>
  )
}

WaterWaveChart.defaultProps = {
  height: 100,
}

export default WaterWaveChart;




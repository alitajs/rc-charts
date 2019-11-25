import * as G2 from '@antv/g2/src';

export type Padding =
  | string
  | {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  | number
  | [number, number, number, number]
  | [string, string];

export interface LineProps {
  top?: boolean;
  start?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
  end?: object | Array<any> | ((xScale?: any, yScale?: any) => any);
  lineStyle?: G2.Styles.line;
  text?: {
    position?: string | number;
    autoRotate?: boolean;
    style?: G2.Styles.text;
    content?: string;
    offsetX?: number;
    offsetY?: number;
  }
}

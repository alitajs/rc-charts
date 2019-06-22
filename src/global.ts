export type TPadding =
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

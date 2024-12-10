import { ViewShape } from '../shape/view-shape';

export interface Container {
  id: string;
  name: string;
  description?: string;

  drawType: string;
  //   x: number;
  //   y: number;
  //   width: number;
  //   height: number;
  //   path?: string[];
  //   color?: string;
  //   stroke?: string;
  view: ViewShape;
  children: Container[];
}

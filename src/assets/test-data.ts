import { Container } from '../app/core/interface/container/container';
import { Ellipse } from '../app/core/interface/shape/ellipse';
import { LShape } from '../app/core/interface/shape/l-shape';
import { Rect } from '../app/core/interface/shape/rect';

const room: Container = {
  id: '1',
  name: 'room №1',
  drawType: 'rect',
  view: {
    x: 0,
    y: 0,
    width: 200,
    height:160,
  } as Rect,
  children: [
    {
      id: '2',
      name: 'table',
      drawType: 'ellipse',
      view: {
        x: 0,
        y: 0,
        width: 20,
        height: 6,
      } as Ellipse,
      children: [],
    },
    {
      id: '3',
      name: 'table',
      drawType: 'rect',
      view: {
        x: 22,
        y: 0,
        width: 20,
        height: 6,
      } as Rect,
      children: [],
    },
    {
      id: '4',
      name: 'table',
      drawType: 'rect',
      view: {
        x: 44,
        y: 0,
        width: 20,
        height: 6,
      } as Rect,
      children: [],
    },
    {
      id: '9',
      name: 'table',
      drawType: 'lShape',
      view: {
        x: 74,
        y: 5,
        width: 20,
        height: 6,
        cx: 10,
        cy: 2,
        rotation:90,
      } as LShape,
      children: [],
    },
    {
      id: '5',
      name: 'table',
      drawType: 'rect',
      view: {
        x: 30,
        y: 20,
        width: 40,
        height: 40,
      } as Rect,
      children: [
        {
          id: '6',
          name: 'table',
          drawType: 'rect',
          view: {
            x: 44,
            y: 40,
            width: 4,
            height: 6,
          } as Rect,
          children: [],
        },
        {
          id: '7',
          name: 'table',
          drawType: 'rect',
          view: {
            x: 55,
            y: 43,
            width: 10,
            height: 6,
          } as Rect,
          children: [],
        },
      ],
    },
    {
      id: '8',
      name: 'table',
      drawType: 'ellipse',
      view: {
        x: 9,
        y: 19,
        width: 6,
        height: 6,
      } as Ellipse,
      children: [],
    },
  ],
};

export { room };

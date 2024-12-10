import { Container } from '../app/core/interface/container/container';

const room: Container = {
  id: '1',
  name: 'room №1',
  drawType: 'rect',
  x: 0,
  y: 0,
  width: 100,
  height: 60,
  children: [
    {
      id: '2',
      name: 'table',
      drawType: 'rect',
      x: 0,
      y: 0,
      width: 20,
      height: 6,
      children: [],
    },
    {
      id: '3',
      name: 'table',
      drawType: 'rect',
      x: 22,
      y: 0,
      width: 20,
      height: 6,
      children: [],
    },
    {
      id: '4',
      name: 'table',
      drawType: 'rect',
      x: 44,
      y: 0,
      width: 20,
      height: 6,
      children: [],
    },
    {
      id: '5',
      name: 'table',
      drawType: 'rect',
      x: 30,
      y: 20,
      width: 40,
      height: 40,
      children: [
        {
          id: '6',
          name: 'table',
          drawType: 'rect',
          x: 44,
          y: 40,
          width: 4,
          height: 6,
          children: [],
        },
        {
          id: '7',
          name: 'table',
          drawType: 'rect',
          x: 55,
          y: 43,
          width: 10,
          height: 6,
          children: [],
        },
      ],
    },
  ],
};

export { room };

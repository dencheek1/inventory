import { Injectable } from '@angular/core';
import { Container } from '../interface/container/container';

@Injectable({
  providedIn: 'root',
})
export class SvgService {
  readonly SVG_NS = 'http://www.w3.org/2000/svg';
  constructor() {}

  //TODO create proper data format
  createSVGGroup(data: Container[]): Element {
    let group = document.createElementNS(this.SVG_NS, 'g');
    // * iterate through data
    // * maybe use flat map
    for (let el of data) {
      switch (el.drawType) {
        case 'rect': {
          let rect = document.createElementNS(this.SVG_NS, 'rect');
          // * can case situation where x would be equal undefined
          rect.setAttribute('x', '' + el.x);
          rect.setAttribute('y', '' + el.y);
          rect.setAttribute('width', '' + el.width);
          rect.setAttribute('height', '' + el.height);
          rect.setAttribute('fill', 'none')
          rect.setAttribute('stroke', 'green');
          rect.setAttribute('stroke-width', '1');
          group.appendChild(rect);
        }
      }
    }
    return group;
  }

  scaleForSize(pWidth:number, pHeight: number, cWidth: number, cHeight: number): number{
    let scale = Math.min(pWidth / cWidth, pHeight / cHeight); 
    return scale * 0.9;
  }

  transformCenter(pWidth: number, pHeight: number, cX:number, cY: number, cWidth: number, cHeight:number): number[]{
    return [0,0]
  }
}

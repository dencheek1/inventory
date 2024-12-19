import { Injectable } from '@angular/core';
import { Container } from '../interface/container/container';
import { Ellipse } from '../interface/shape/ellipse';
import { Rect } from '../interface/shape/rect';
import { LShape } from '../interface/shape/l-shape';
import { ViewShape } from '../interface/shape/view-shape';

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
        case 'rect':
          {
            group.appendChild(this.createRect(el.view as Rect, el.id));
          }
          break;
        case 'ellipse':
          {
            group.appendChild(this.createEllipse(el.view as Ellipse, el.id));
          }
          break;
        case 'lShape':
          {
            group.appendChild(this.lShape(el.view as LShape, el.id));
          }
          break;
      }
    }
    return group;
  }

  scaleForSize(
    pWidth: number,
    pHeight: number,
    cWidth: number,
    cHeight: number
  ): number {
    let scale = Math.min(pWidth / cWidth, pHeight / cHeight);
    return Math.min(scale * 0.9, 5);
  }

  transformCenter(
    pWidth: number,
    pHeight: number,
    cX: number,
    cY: number,
    cWidth: number,
    cHeight: number,
    scale: number
  ): number[] {
    let result = [0, 0];
    result[0] = pWidth / 2 - (cX + cWidth / 2) * scale;
    result[1] = pHeight / 2 - (cY + cHeight / 2) * scale;
    return result;
  }

  createRect(container: Rect, id: string): Element {
    // * can case situation where x would be equal undefined

    let rect = document.createElementNS(this.SVG_NS, 'rect');
    rect.setAttribute('x', '' + container.x);
    rect.setAttribute('y', '' + container.y);
    rect.setAttribute('width', '' + container.width);
    rect.setAttribute('height', '' + container.height);
    rect = this.setCommonAttributes(container, rect, id) as SVGRectElement;
    ((container.rotation == undefined) || (container.rotation  % 90) == 0) && rect.setAttribute('shape-rendering', 'crispEdges');
    return rect;
  }

  createEllipse(container: Ellipse, id: string): Element {
    let ellipse = document.createElementNS(this.SVG_NS, 'ellipse');
    ellipse.setAttribute('cx', '' + (container.x + container.width / 2));
    ellipse.setAttribute('cy', '' + (container.y + container.height / 2));
    ellipse.setAttribute('rx', '' + container.width / 2);
    ellipse.setAttribute('ry', '' + container.height / 2);
    ellipse = this.setCommonAttributes(container, ellipse, id) as SVGEllipseElement;
    return ellipse;
  }

  lShape(container: LShape, id: string): Element {
    let path = document.createElementNS(this.SVG_NS, 'path');
    let d = '';
  // * result in origin in left top corner
    d +=
      'M ' +
      (container.x) +
      ',' +
      (container.y) +
      ' ';
    d += 'h ' + (container.width) + ' ';
    d += 'v ' + container.height + ' ';
    d += 'h ' + (-container.width + container.cx) + ' ';
    d += 'v ' + (-container.height + container.cy) + ' ';
    d += 'h ' + (-container.cx) + ' ';
    d += 'z';
    path.setAttribute('d', d);
    path = this.setCommonAttributes(container, path, id) as SVGPathElement;
    path.setAttribute('fill', '#0000');
    (container.rotation == undefined || (container.rotation  % 90) == 0) && path.setAttribute('shape-rendering', 'crispEdges');
    return path;
  }

  setCommonAttributes(shape : ViewShape, el: Element, id:string): Element{
    el.setAttribute('fill', shape.fill ?? '#0000');
    el.setAttribute('stroke', shape.stroke ?? '#333');
    el.setAttribute('stroke-width', '1');
    el.setAttribute('group_item_id', id);
    el.setAttribute('transform', `rotate(${ shape.rotation ?? 0}, ${shape.x + (shape.width/2)}, ${shape.y + (shape.height/2)})`)
    return el;
  }
}

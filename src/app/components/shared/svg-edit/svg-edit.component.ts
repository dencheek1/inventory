import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { SvgService } from '../../../core/svg/svg.service';
import { Container } from '../../../core/interface/container/container';
import { Rect } from '../../../core/interface/shape/rect';
import { Ellipse } from '../../../core/interface/shape/ellipse';
import { LShape } from '../../../core/interface/shape/l-shape';

@Component({
  selector: 'app-svg-edit',
  standalone: true,
  imports: [],
  templateUrl: './svg-edit.component.html',
  styleUrl: './svg-edit.component.scss',
})
export class SvgEditComponent {
  private mode: string = 'rect';
  private svg = inject(SvgService);
  public state: any = {};
  @ViewChild('data') mapView!: ElementRef;
  translate = computed(
    () => `translate(${this.translateValues()[0]} ${this.translateValues()[1]})`
  );
  translateValues = signal<Array<number>>([0, 0]);

  scaleValue = signal<number>(1);
  scale = computed(() => `scale(${this.scaleValue()})`);

  mouseDown(e: MouseEvent) {
    if (e.button == 0) {
      this.state.startPosition = [
        e.offsetX - (e.offsetX % 5),
        e.offsetY - (e.offsetY % 5),
      ];
      this.state.draw = true;

      switch (this.mode) {
        case 'rect':
          {
            let rect = {} as Rect;
            rect.x = this.state.startPosition[0];
            rect.y = this.state.startPosition[1];
            rect.width = 0;
            rect.height = 0;
            let elem = this.svg.createRect(rect, 'draw');
            this.state.currentElement = elem;
            this.mapView.nativeElement.textContent = '';
            this.mapView.nativeElement.appendChild(elem);
          }
          break;
        case 'ellipse':
          {
            let ellipse = {} as Ellipse;
            ellipse.x = this.state.startPosition[0];
            ellipse.y = this.state.startPosition[1];
            ellipse.width = 0;
            ellipse.height = 0;
            let elem = this.svg.createEllipse(ellipse, 'draw');
            this.state.currentElement = elem;
            this.mapView.nativeElement.textContent = '';
            this.mapView.nativeElement.appendChild(elem);
          }
          break;
        case 'l-shape':
          {
            if (this.state.stage == 2) {
              // this.state = {};
              // this.state.draw = false;
              
              //TODO implement second stage start
            } else {
              let lShape = {} as LShape;
              lShape.x = this.state.startPosition[0];
              lShape.y = this.state.startPosition[1];
              lShape.width = 0;
              lShape.height = 0;
              let elem = this.svg.lShape(lShape, 'draw');
              this.state.currentElement = elem;
              this.mapView.nativeElement.textContent = '';
              this.mapView.nativeElement.appendChild(elem);
            }
          }
          break;
      }
    } else if (e.button == 1) {
      this.state.drag = true;
    }
  }

  mouseMove(e: MouseEvent) {
    // if (e.button == 0) {
      switch (this.mode) {
        case 'rect':
          {
            if (this.state.draw == true && this.state.startPosition) {
              console.log(this.state.currentElement);
              let el = this.state.currentElement as HTMLElement;
              let x,
                y,
                width,
                height = 0;
              x = Math.min(
                e.offsetX - (e.offsetX % 5),
                this.state.startPosition[0]
              );
              y = Math.min(
                e.offsetY - (e.offsetY % 5),
                this.state.startPosition[1]
              );
              width = Math.abs(e.offsetX - this.state.startPosition[0]);
              height = Math.abs(e.offsetY - this.state.startPosition[1]);

              width = width - (width % 5);
              height = height - (height % 5);

              el.setAttribute('x', '' + x);
              el.setAttribute('y', '' + y);
              el.setAttribute('width', '' + width);
              el.setAttribute('height', '' + height);
            }
          }
          break;
        case 'ellipse':
          {
            if (this.state.draw && this.state.startPosition) {
              let el = this.state.currentElement as HTMLElement;
              let x,
                y,
                width,
                height = 0;
              let mX,
                mY = 0;
              mX = e.offsetX - (e.offsetX % 5);
              mY = e.offsetY - (e.offsetY % 5);
              x = Math.min(mX, this.state.startPosition[0]);
              y = Math.min(
                e.offsetY - (e.offsetY % 5),
                this.state.startPosition[1]
              );
              width = Math.abs(mX - this.state.startPosition[0]);
              height = Math.abs(mY - this.state.startPosition[1]);

              width = width - (width % 5);
              height = height - (height % 5);

              console.log(el);

              //middle of the diogonal
              el.setAttribute('cx', '' + (x + width / 2));
              el.setAttribute('cy', '' + (y + height / 2));
              //half the width
              el.setAttribute('rx', '' + width / 2);
              el.setAttribute('ry', '' + height / 2);
            }
          }
          break;
        case 'l-shape':
          {
            if (this.state.draw && this.state.stage == 2 ) {
              let cx = Math.max(0, Math.min(this.state.width,(e.offsetX - e.offsetX%5) - this.state.x)); 
              let cy = Math.max(0,Math.min(this.state.height,(e.offsetY - e.offsetY%5) - this.state.y)); 
             
              let lShape = {} as LShape;
              lShape.x = this.state.x;
              lShape.y = this.state.y;
              lShape.width = this.state.width;
              lShape.height = this.state.height;
              lShape.cx = cx;
              lShape.cy = cy;

              let res = this.svg.lShape(lShape, '0');
              this.mapView.nativeElement.textContent = '';
              this.mapView.nativeElement.appendChild(res);

            }
            else if (this.state.draw == true && this.state.startPosition) {

              let x,
                y,
                width,
                height = 0;
              x = Math.min(
                e.offsetX - (e.offsetX % 5),
                this.state.startPosition[0]
              );
              y = Math.min(
                e.offsetY - (e.offsetY % 5),
                this.state.startPosition[1]
              );
              width = Math.abs(e.offsetX - this.state.startPosition[0]);
              height = Math.abs(e.offsetY - this.state.startPosition[1]);

              width = width - (width % 5);
              height = height - (height % 5);
              this.state.width = width;
              this.state.height = height;
              this.state.x = x
              this.state.y = y;
              // init shape object
              let lShape = {} as LShape;
              lShape.x = x; 
              lShape.y = y; 
              lShape.cx = 0;
              lShape.cy = 0;
              lShape.width = width;
              lShape.height = height;

              let res = this.svg.lShape(lShape,'0');
              this.mapView.nativeElement.textContent = '';
              this.mapView.nativeElement.appendChild(res);

            }
          }
          break;
      }
      if (e.button == 1 && this.state.drag) {
      e.stopPropagation;
      let tv = this.translateValues();
      this.translateValues.set([tv[0] + e.movementX, tv[1] + e.movementY]);
    }
  }

  mouseUp(e: MouseEvent) {
    switch (this.mode) {
      case 'rect':
        {
          if (this.state.draw == true && this.state.startPosition) {
            this.state.draw = false;
          }
        }
        break;
      case 'ellipse':
        {
          if (this.state.draw == true && this.state.startPosition) {
            this.state.draw = false;
          }
        }
        break;
        case 'l-shape':
          {
          
          if (this.state.draw == true && this.state.startPosition) {
            if(this.state.stage != 2) this.state.stage = 2;
            else{ this.state.draw = false;
              this.state.stage = 1;
              
            }
          }
          }
          break;
    }
    if (e.button == 1) {
      this.state.drag = false;
    }
  }
  selectMode(mode: string) {
    this.mode = mode;
  }
}

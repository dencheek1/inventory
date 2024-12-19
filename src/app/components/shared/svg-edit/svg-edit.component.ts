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

@Component({
  selector: 'app-svg-edit',
  standalone: true,
  imports: [],
  templateUrl: './svg-edit.component.html',
  styleUrl: './svg-edit.component.scss',
})
export class SvgEditComponent {
  private mode: string = 'ellipse';
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
    switch (this.mode) {
      case 'rect':
        {
          this.state.startPosition = [
            e.offsetX - (e.offsetX % 5),
            e.offsetY - (e.offsetY % 5),
          ];
          this.state.draw = true;
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
          this.state.startPosition = [
            e.offsetX - (e.offsetX % 5),
            e.offsetY - (e.offsetY % 5),
          ];
          this.state.draw = true;
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
    }
  }

  mouseMove(e: MouseEvent) {
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
          if (this.state.draw == true && this.state.startPosition) {
            console.log('ellipse');
            console.log(this.state.currentElement);
            let el = this.state.currentElement as HTMLElement;
            let x, y, width, height = 0;
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

            console.log(el);

            el.setAttribute('cx', '' + (x + width/2));
            el.setAttribute('cy', '' + (y + height/2));
            el.setAttribute('rx', '' + width);
            el.setAttribute('ry', '' + height);
          }
        }
        break;
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
    }
  }
}

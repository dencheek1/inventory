import {
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { room } from '../../../../assets/test-data';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  mapDragged = false;
  translate = computed(
    () => `translate(${this.translateValues()[0]} ${this.translateValues()[1]})`
  );
  translateValues = signal<Array<number>>([0, 0]);
  privateData = room;
  scaleValue = 1;
  @ViewChild('map_data', { static: false }) mapView!: ElementRef;
  //TODO traverse data structure and build svg for it
  // * might work as plain html text
  //TODO add proper interface for the data structure
  getSVGGroup(room: any): string {
    let result = '';
    result += `<rect x=0 y=0 width=100 height=60 fill=#f00/>`;
    this.mapView.nativeElement.innerHTML = result;
    return result;
  }
  scale() {
    return `scale(${this.scaleValue})`;
  }

  dragStart() {
    this.mapDragged = true;
    console.log('drag start');
  }

  drag(e: MouseEvent) {
    e.stopPropagation;
    if (this.mapDragged && e.buttons & 1) {
      console.log('drag');
      let tv = this.translateValues();
      this.translateValues.set([tv[0] + e.movementX, tv[1] + e.movementY]);
    } else {
      this.mapDragged = false;
    }
  }

  dragStop() {
    this.mapDragged = false;
    console.log('drag stop');
  }
}

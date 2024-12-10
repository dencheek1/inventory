import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { room } from '../../../../assets/test-data';
import { SvgService } from '../../../core/svg/svg.service';
import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit{
  private svgService = inject(SvgService);
  private dataService = inject(DataService);

  mapDragged = false;
  translate = computed(
    () => `translate(${this.translateValues()[0]} ${this.translateValues()[1]})`
  );
  translateValues = signal<Array<number>>([0, 0]);
  privateData = room;
  scaleValue = signal<number>(1);
  scale = computed(() => `scale(${this.scaleValue()})`)

  @ViewChild('data') mapView!: ElementRef;
  //TODO traverse data structure and build svg for it
  // * might work as plain html text
  //TODO add proper interface for the data structure
  getSVGGroup(room: any): Element{
    let rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x','0');
    rect.setAttribute('y','90');
    rect.setAttribute('width','50');
    rect.setAttribute('height','50');
    rect.setAttribute('fill','green');
    // this.mapView.nativeElement.appendChild(rect);
    return rect;
  }
  // scale() {
  //   return `scale(${this.scaleValue})`;
  // }

  dragStart() {
    this.mapDragged = true;
    console.log(this.mapView);
    // let rect = document.createElement('rect');
    // let element = new SVGAElement();
  }

  drag(e: MouseEvent) {
    e.stopPropagation;
    if (this.mapDragged && e.buttons & 1) {
      let tv = this.translateValues();
      this.translateValues.set([tv[0] + e.movementX, tv[1] + e.movementY]);
    } else {
      this.mapDragged = false;
    }
  }

  dragStop() {
    this.mapDragged = false;
  }

  ngAfterViewInit(): void {
    let group = this.svgService.createSVGGroup(this.dataService.flatDataNodes(this.privateData));
    this.mapView.nativeElement.appendChild(group);
    console.log(this.dataService.flatDataNodes(this.privateData));
    this.scaleValue.set(this.svgService.scaleForSize(400, 800, this.privateData.view.width , this.privateData.view.height));
    this.translateValues.set(this.svgService.transformCenter(400,800,0,0,this.privateData.view.width,this.privateData.view.height,this.scaleValue()));
    console.log(this.scaleValue());
  }

  logData(e: Event){
    console.log(e.target);
    if((e.target as HTMLElement).hasAttribute('group_item_id')){
      let id = (e.target as HTMLElement).getAttribute('group_item_id');
      let el = this.dataService.flatDataNodes(this.privateData).find(el => el.id == id);
      console.log(el);
      this.scaleValue.set(this.svgService.scaleForSize(400, 800, el?.view.width ?? 0, el?.view.height ?? 0));
      this.translateValues.set(this.svgService.transformCenter(400,800,el?.view.x ?? 0, el?.view.y??0,el?.view.width ?? 0,el?.view.height ?? 0,this.scaleValue()));
    }
  }
}

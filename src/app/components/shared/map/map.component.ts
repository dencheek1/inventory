import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { SvgService } from '../../../core/svg/svg.service';
import { DataService } from '../../../core/data/data.service';
import { Container } from '../../../core/interface/container/container';

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
  public container = input.required<Container>();
  scaleValue = signal<number>(1);
  scale = computed(() => `scale(${this.scaleValue()})`)

  @ViewChild('data') mapView!: ElementRef;
  //TODO traverse data structure and build svg for it
  // * might work as plain html text
  //TODO add proper interface for the data structure
  getSVGGroup(room: any): Element{
    let rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    // this.mapView.nativeElement.appendChild(rect);
    return rect;
  }
  dragStart() {
    this.mapDragged = true;
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
    let group = this.svgService.createSVGGroup(this.dataService.flatDataNodes(this.container()));
    this.mapView.nativeElement.appendChild(group);
    console.log(this.dataService.flatDataNodes(this.container()));
    this.scaleValue.set(this.svgService.scaleForSize(400, 800, this.container().view.width , this.container().view.height));
    this.translateValues.set(this.svgService.transformCenter(400,800,0,0,this.container().view.width,this.container().view.height,this.scaleValue()));
    console.log(this.scaleValue());
  }

  logData(e: Event){
    console.log(e.target);
    if((e.target as HTMLElement).hasAttribute('group_item_id')){
      let id = (e.target as HTMLElement).getAttribute('group_item_id');
      let el = this.dataService.flatDataNodes(this.container()).find(el => el.id == id);
      console.log(el);
      this.scaleValue.set(this.svgService.scaleForSize(400, 800, el?.view.width ?? 0, el?.view.height ?? 0));
      this.translateValues.set(this.svgService.transformCenter(400,800,el?.view.x ?? 0, el?.view.y??0,el?.view.width ?? 0,el?.view.height ?? 0,this.scaleValue()));
    }
  }

  // TODO scale relative to the cursor position
  scroll(e: WheelEvent){
    let val = this.scaleValue();
    val += e.deltaY * -0.01;
    val = Math.min(6,Math.max(1, val));
    this.scaleValue.set(val);
    console.log(e);
  }
}

import { Component } from '@angular/core';
import { MapComponent } from "../../shared/map/map.component";
import { room } from '../../../../assets/test-data';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  container = room;
}

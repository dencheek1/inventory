import { Component, computed, input } from '@angular/core';
import { Container } from '../../../core/interface/container/container';

@Component({
  selector: 'app-item-info',
  standalone: true,
  imports: [],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.scss'
})
export class ItemInfoComponent {
  public item = input.required<Container>({});
  public depth = input<number>(1);

}

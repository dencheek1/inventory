import { Component } from '@angular/core';
import { SvgEditComponent } from "../../shared/svg-edit/svg-edit.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [SvgEditComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

}

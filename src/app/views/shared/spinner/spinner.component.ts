import { Component } from '@angular/core';
import { SpinnerModule } from '@coreui/angular';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [SpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

}

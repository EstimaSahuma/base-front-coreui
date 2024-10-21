import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';

@Component({
    selector: 'app-widgets-dropdown',
    templateUrl: './widgets-dropdown.component.html',
    styleUrls: ['./widgets-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, DropdownDividerDirective, ChartjsComponent]
})
export class WidgetsDropdownComponent implements OnInit {

  constructor(
    
  ) {}

  @Input() estatistic: any;

  data: any[] = [];
  options: any[] = [];

  ngOnInit(): void {
    
  }

}


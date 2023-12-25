import {Component} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonToggleModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}

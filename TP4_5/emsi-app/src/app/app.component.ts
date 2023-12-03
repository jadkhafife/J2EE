import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'emsi-app';

  actions : Array<any> = [
    {title: 'Home', "route": '/home', icon: 'house'},
    {title: 'Products', "route": '/products', icon: 'list'},
    {title: 'New Product', "route": '/newProduct', icon: 'plus'}
  ];

  currentAction : any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}

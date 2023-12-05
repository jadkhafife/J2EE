import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    constructor() { }

  actions : Array<any> = [
    {title: 'Home', "route": '/home', icon: 'house'},
    {title: 'Products', "route": '/admin/products', icon: 'list'},
    {title: 'New Product', "route": '/admin/newProduct', icon: 'plus'}
  ];

  currentAction : any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

}

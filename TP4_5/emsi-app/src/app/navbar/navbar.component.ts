import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    constructor(public appState:AppStateService, private router:Router) { }

  actions : Array<any> = [
    {title: 'Home', "route": '/home', icon: 'house'},
    {title: 'Products', "route": '/admin/products', icon: 'list'},
    {title: 'New Product', "route": '/admin/newProduct', icon: 'plus'}
  ];

  currentAction : any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    // this.appState.setAuthState={isAuthenticated: false};
    this.router.navigateByUrl('/login');
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}

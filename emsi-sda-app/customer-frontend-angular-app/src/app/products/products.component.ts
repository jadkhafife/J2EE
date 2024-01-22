import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products : any;

  constructor(private http : HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:8084/products")
    .subscribe({
      next: data => {
        console.log(data);
        this.products = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

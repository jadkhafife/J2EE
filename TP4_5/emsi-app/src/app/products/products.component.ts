import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Array<any> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe({
        next : data => {this.products = data},
        error : error => {console.log(error)}
      });
    // this.http.get<Array<any>>('http://localhost:8089/products')
    //   .subscribe({
    //     next : data => {this.products = data},
    //     error : error => {console.log(error)}
    //   });
  }


  handleCheckProduct(product: any) {
    this.productService.checkProduct(product)
      .subscribe({
        next : updated => {
          product.checked = updated.checked;
        },
        error : error => {console.log(error)}
      });
    // this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
    //   {checked: !product.checked})
    //   .subscribe({
    //     next : updated => {
    //       product.checked = updated.checked;
    //     },
    //     error : error => {console.log(error)}
    //   });

  }


}

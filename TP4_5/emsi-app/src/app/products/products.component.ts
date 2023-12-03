import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Array<Product> = [];
  public keyword!: String;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(1,3)
      .subscribe({
        next : data => {this.products = data},
        error : error => {console.log(error)}
      });
  }


  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next : updated => {
          product.checked = updated.checked;
        },
        error : error => {console.log(error)}
      });
  }


  handleDeleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete ${product.name}?`))
    this.productService.deleteProduct(product)
      .subscribe({
        next : () =>{
          this.products = this.products.filter(p => p.id !== product.id);
        }
      });

  }

  handleSearchProduct() {
    this.productService.searchProduct(this.keyword)
      .subscribe({
        next : data => {this.products = data},
        error : error => {console.log(error)}
      });
  }
}

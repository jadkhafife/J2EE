import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgClass
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Array<Product> = [];
  public keyword!: string;
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(private productService: ProductService, private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe({
        next : (resp) => {
          this.products = resp.body as Product[];
          let totalProducts= parseInt(<string>resp.headers.get('x-total-count'));
          // console.log(totalProducts);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          // console.log(this.totalPages);
          if (totalProducts % this.pageSize != 0) this.totalPages++;
        },
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

  // handleSearchProduct() {
  //   this.currentPage = 1;
  //   this.totalPages = 0;
  //   this.productService.searchProduct(this.keyword, this.currentPage, this.pageSize)
  //     .subscribe({
  //       next : data => {this.products = data},
  //       error : error => {console.log(error)}
  //     });
  // }

  handleGotoPage(number: number) {
    this.currentPage = number;
    this.getProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/admin/edit/${product.id}`);
  }
}

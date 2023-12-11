import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
    imports: [
        NgIf,
        NgForOf
    ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products : any;
  constructor(private http: HttpClient) {
  }
    ngOnInit(){
        this.http.get('http://localhost:9999/inventory-service/products?projection=fullProduct')
            .subscribe(
            data => {
                this.products= data;
        });
    }
}

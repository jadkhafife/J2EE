import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders : any;
  customerId!:number;
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
    this.customerId = this.route.snapshot.params['customerId'];
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:9999/order-service/orders/search/byCustomerId?projection=fullOrder&customerId=${this.customerId}`)
        .subscribe(
            data => {
              this.orders= data;
            });
  }

  getOrderDetails(o: any) {
    this.router.navigate(['/order-details', o.id]);
  }
}

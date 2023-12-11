import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, DecimalPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    JsonPipe,
    DecimalPipe
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  orderDetails : any;
  orderId!:number;
  constructor(private http:HttpClient, private router:Router, private route:ActivatedRoute) {
    this.orderId = this.route.snapshot.params['orderId'];
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:9999/order-service/fullOrder/${this.orderId}`)
        .subscribe(
            data => {
              this.orderDetails= data;
            });
  }

  getOrderDetails(o: any) {
    this.router.navigate(['/order-details', o.id]);
  }
}

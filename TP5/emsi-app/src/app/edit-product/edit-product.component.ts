import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!:number;
  productFormGroup!: FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next : (product)=>{
        this.productFormGroup=this.fb.group({
          id : this.fb.control(product.id),
          name : this.fb.control(product.name, [Validators.required]),
          price : this.fb.control(product.price, [Validators.min(10)]),
          checked : this.fb.control(product.checked)
        });
      },
      error :error =>{
        console.log(error);
      }
    });
  }

  updateProduct() {
    let product = this.productFormGroup.value;
    this.productService.updateProduct(product)
      .subscribe({
        next : (updatedProduct)=>{
          alert(`Product ${updatedProduct.name} has been updated successfully`);
          this.router.navigateByUrl("/admin/products").then(r => console.log("navigate to products"));
        },
        error : error => {
          console.log(error);
        }
      });
  }
}

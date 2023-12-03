import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService:ProductService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      price: this.formBuilder.control(0),
      checked: this.formBuilder.control(false),
    });
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product)
      .subscribe({
        next: (product) => {
          console.log(product);
          this.productForm.reset();
        },
        error: (err) => console.log(err)
      });

  }
}

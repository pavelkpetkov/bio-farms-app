import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  errorMessage = '';

  constructor(
    private productServise: ProductService,
    private router: Router
  ) { }

  createProduct(form: NgForm): void {
    if (form.invalid) { return; }
    this.productServise.saveProduct(form.value).subscribe({
      next: () => {
        this.router.navigate(['/products'])
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    })
  }

}

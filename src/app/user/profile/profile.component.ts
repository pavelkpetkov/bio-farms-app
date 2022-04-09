import { Component } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  get farmer() {
    return this.userService.farmer;
  }

  products: IProduct[] | undefined;
  allMyProducts: IProduct[] | undefined;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.products = undefined;
    this.productService.loadProducts().subscribe(products => this.products = products.filter(p => p.farmer == this.farmer?._id));
  }

}

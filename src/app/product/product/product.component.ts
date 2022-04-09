import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFarmer } from 'src/app/shared/interfaces/farmer';
import { IProduct } from 'src/app/shared/interfaces/product';
import { UserService } from 'src/app/user/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product: IProduct | undefined;
  owner: IFarmer | undefined;

  get farmer() {
    return this.userService.farmer;
  }

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.fetchProduct();
  }

  fetchProduct(): void {
    this.product = undefined;
    this.owner = undefined;
    const id = this.activatedRoute.snapshot.params['productId'];
    this.productService.loadProduct(id).subscribe(product => {
      this.product = product;
      this.userService.getFarmerInfo(this.product!.farmer).subscribe(owner => this.owner = owner);
    });
  }

  deleteProduct() {

  }

}

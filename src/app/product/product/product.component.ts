import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isOwner: boolean = false;
  toggle: boolean = false;

  get farmer() {
    return this.userService.farmer;
  }

  get client() {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.fetchProduct();
  }

  fetchProduct(): void {
    this.product = undefined;
    this.owner = undefined;
    const id = this.activatedRoute.snapshot.params['productId'];
    this.productService.loadProduct(id).subscribe(product => {
      this.product = product;
      this.userService.getFarmerInfo(this.product!.farmer).subscribe(owner => {
        this.owner = owner;
        this.isOwner = (this.owner._id === this.userService.farmer?._id);
      });
    });
  }

  deleteProduct(): void {
    const id = this.activatedRoute.snapshot.params['productId'];
    this.productService.loadProduct(id).subscribe(product => this.product = product);
    const owner_id = this.product!.farmer;
    this.productService.deleteOneProduct(id, owner_id).subscribe(() => {
      this.product = undefined;
      this.router.navigate(['/profile']);
    });
  }

  order(): void {
    this.toggle = true;
  }

  addOrder(quantity: any): void {
    const id = this.activatedRoute.snapshot.params['productId'];
    let qty = + quantity;
    if (qty < 0 || quantity === NaN) { console.log('Enter positive value!'); return;  }

    this.productService.addOrder(id, qty).subscribe(product => {
      this.product = product;
      this.router.navigate(['/profile']);
    })
  }
 
}

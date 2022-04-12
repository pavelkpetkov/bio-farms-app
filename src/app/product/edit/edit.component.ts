import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFarmer } from 'src/app/shared/interfaces/farmer';
import { IProduct } from 'src/app/shared/interfaces/product';
import { UserService } from 'src/app/user/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  product: IProduct | undefined;
  owner: IFarmer | undefined;
  isOwner: any;

  get current() {
    return this.product!;
  }

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params['productId'];
    this.productService.loadProduct(id).subscribe(product => {
      this.product = product;
      const currentUserId = this.userService.farmer?._id;
      const currentProductOwnerId = this.product.farmer;
      this.isOwner = currentUserId == currentProductOwnerId;
    });
  }

  editProduct(form: NgForm): void {
    if (form.invalid) { return; }
    const id = this.activatedRoute.snapshot.params['productId'];
    const owner_id = this.product!.farmer;
    this.productService.editOneProduct(id, owner_id, form.value).subscribe({
      next: () => {
        this.router.navigate(['/products'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

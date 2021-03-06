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

  get client() {
    this.clientEmail = this.userService.user?.email;
    return this.userService.user;
  }

  products: IProduct[] | undefined;
  allProducts: any[] | undefined;
  orderedProducts: any[] | undefined;
  orders: any[] | undefined;
  clientEmail: any | undefined;
  resultArr: any | undefined;
  imagesArr: any | undefined;

  toggle: boolean = false;
  detailsArrayIDs: any [] = [['1']];

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    this.fetchProducts();
    this.fetchAllProducts();
    this.loadOrderedProducts();
  }

  fetchProducts(): void {
    this.products = undefined;
    this.productService.loadProducts().subscribe(products => this.products = products.filter(p => p.farmer == this.farmer?._id));
  }

  fetchAllProducts(): void {
    this.allProducts = undefined;
    this.productService.loadProducts().subscribe(products => {
      this.allProducts = products;
      let clientEmail = this.clientEmail;
      let result: any = [];
      let images: any = [];
      this.allProducts?.filter(function (el) {
        let arrayOfOrders = el.orders;
        for (let i = 0; i < arrayOfOrders.length; i++) {
          const element = arrayOfOrders[i];
          if (element.client == clientEmail) {
            result.push(el.title);
            result.push(element.quantity);
            images.push(el.productImage);
          }
        }
      })
      let modifiedArr = [];
      for (let j = 0; j < result.length; j++) {
        const name = result[j];
        const qty = result[j + 1];
        const output = `${name} - ${qty} kg.`;
        modifiedArr.push(output);
        j++;
      }
      this.resultArr = modifiedArr;
      this.imagesArr = images;
    });
  }

  loadOrderedProducts() {
    this.orderedProducts = undefined;
    this.orders = undefined;
    this.productService.loadProducts().subscribe(products => {
      this.orderedProducts = products
        .filter(p => p.farmer == this.farmer?._id)
        .filter(p => p.orders.length > 0);

        this.detailsArrayIDs = [];

      for (const p of this.orderedProducts) {
        let totalQuantityOrderedofThisProduct: Number = 0;
        let thisProductDetailedOrder = [''];
        for (const o of p.orders) {
          const currentOrder: Number = o.quantity;
          totalQuantityOrderedofThisProduct = Number(totalQuantityOrderedofThisProduct) + Number(currentOrder);

          thisProductDetailedOrder.push(`${o.client} needs ${currentOrder} kg.`);
        }
        let res = `Total orders for ${p.title} are ${totalQuantityOrderedofThisProduct} kg.`;
        this.orders ? this.orders.push(res) : this.orders = [res];

        this.detailsArrayIDs.push(thisProductDetailedOrder);
      }
    });
  }

  seeClients(): void {
    this.toggle = !this.toggle;
  }

}

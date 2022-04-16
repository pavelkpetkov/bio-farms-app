import { Component } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  allProducts: IProduct[] | undefined;

  constructor(
    private productService: ProductService
  ) {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.allProducts = undefined;
    this.productService.loadProducts().subscribe(products => this.allProducts = products);
  }

  searchProduct(search: string): void {
    this.allProducts = undefined;
    this.productService.loadProducts().subscribe(products => this.allProducts = products.filter(
      (one) => { if (search === '') { return one } else if (one.title.toLowerCase().includes(search.toLowerCase())) { return one } else { return null } }));
  }
}

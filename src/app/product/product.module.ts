import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    NewProductComponent,
    AllProductsComponent,
    ProductComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ],
  exports: [
    NewProductComponent,
    AllProductsComponent,
    ProductComponent
  ]
})
export class ProductModule { }

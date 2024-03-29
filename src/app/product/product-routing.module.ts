import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { AllProductsComponent } from './all-products/all-products.component';
import { DoneComponent } from './done/done.component';
import { EditComponent } from './edit/edit.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
        path: 'products',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AllProductsComponent
            },
            {
                path: ':productId',
                component: ProductComponent
            }
        ]
    },
    {
        path: 'new-product',
        component: NewProductComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login',
        }
    },
    {
        path: 'ordered',
        component: DoneComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login',
        }
    },
    {
        path: 'edit/:productId',
        component: EditComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login',
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from '../product/product.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private userService: UserService) { }

  saveProduct(data: any){
    console.log(this.userService.farmer?._id);
    const farmer_id = this.userService.farmer?._id;
    const dataToSend = {...data, farmer_id};
    console.log(dataToSend);
    return this.http.post<IProduct>(`http://localhost:3030/data/create`, dataToSend, { withCredentials: true });
  }
}

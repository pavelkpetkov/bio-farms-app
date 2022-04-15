import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: IProduct | undefined;

  constructor(private http: HttpClient, private userService: UserService) { }

  saveProduct(data: any) {
    const farmer_id = this.userService.farmer?._id;
    const dataToSend = { ...data, farmer_id };

    return this.http.post<IProduct>(`http://localhost:3030/data/create`, dataToSend, { withCredentials: true });
  }

  loadProducts() {
    return this.http.get<IProduct[]>(`http://localhost:3030/data`, { withCredentials: true });
  }

  loadProduct(id: string) {
    return this.http.get<IProduct>(`http://localhost:3030/data/details/${id}`, { withCredentials: true });
  }

  deleteOneProduct(id: string, owner_id: string) {
    const farmer_id = this.userService.farmer?._id;

    const options = {
      body: {
        farmer_id,
        owner_id
      }
    };
    return this.http.delete<IProduct>(`http://localhost:3030/data/delete/${id}`, options);
  }

  editOneProduct(id: string, owner_id: string, data: any) {
    const farmer_id = this.userService.farmer?._id;
    const dataToSend = { ...data, farmer_id, owner_id };
    return this.http.put<IProduct>(`http://localhost:3030/data/edit/${id}`, dataToSend, { withCredentials: true });
  }

  addOrder(id: string, quantity: number) {
    const newOrder = { client: this.userService.user?._id, quantity: quantity }
    const body = {
        newOrder
      }
    return this.http.put<IProduct>(`http://localhost:3030/data/order/${id}`, body, { withCredentials: true })
  }

}

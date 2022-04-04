import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(data: any){
    return this.http.post<IProduct>(`http://localhost:3030/data/create`, data, { withCredentials: true });
  }
}

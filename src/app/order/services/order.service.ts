import { Injectable } from '@angular/core';
import { environtment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environtment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getOrders(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.apiUrl}/order/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  deleteOrder(id: number) {
    return this.http.put(`${this.apiUrl}/order/delete?orderId=${id}`, {});
  }

  getOrderById(id: number) {
    return this.http.get(`${this.apiUrl}/order/get-by-id?orderId=${id}`);
  }

  postOrder(data: any) {
    return this.http.post(`${this.apiUrl}/order/create`, data);
  }

  putOrder(data: any) {
    return this.http.put(`${this.apiUrl}/order/update`, data);
  }

  getAllCustomer() {
    return this.http.get(`${this.apiUrl}/customer/get-all?`);
  }

  getAllItems() {
    return this.http.get(`${this.apiUrl}/item/get-all?`);
  }

  generateReport(data: any) {
    return this.http.get(`${this.apiUrl}/ordersReport/${data}`);
  }


}

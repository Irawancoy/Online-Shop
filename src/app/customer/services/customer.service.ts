import { Injectable } from '@angular/core';
import { environtment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = environtment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomers(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.apiUrl}/customer/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  deleteCustomer(id: number) {
    return this.http.put(`${this.apiUrl}/customer/delete?customerId=${id}`, {});
  }

  getCustomerById(id: number) {
    return this.http.get(`${this.apiUrl}/customer/get-by-id?customerId=${id}`);
  }

  postCustomer(data: any) {
    return this.http.post(`${this.apiUrl}/customer/create`, data);
  }

  putCustomer(data: any) {
    return this.http.put(`${this.apiUrl}/customer/update`, data);
  }
}

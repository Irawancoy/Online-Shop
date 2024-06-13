import { Injectable } from '@angular/core'
import { environtment } from '../../../environment/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = environtment.apiUrl
  
  constructor(private http: HttpClient) { }

  getItems(pageNumber: number, pageSize: number) {
    return this.http.get(
      `${this.apiUrl}/item/get-all?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  deleteItem(id: number) {
    return this.http.put(`${this.apiUrl}/item/delete?itemId=${id}`, {});
  }

  getItemById(id: number) {
    return this.http.get(`${this.apiUrl}/item/get-by-id?itemId=${id}`);
  }

  postItem(data: any) {
    return this.http.post(`${this.apiUrl}/item/create`, data);
  }

  putItem(data: any) {
    return this.http.put(`${this.apiUrl}/item/update`, data);
  }


  
}

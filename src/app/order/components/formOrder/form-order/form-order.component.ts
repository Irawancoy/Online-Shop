import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.css'
})
export class FormOrderComponent {
  @Input() orderId: any;
  @Output() afterSave = new EventEmitter<any>();
  mode: string | undefined;
  formModel: {
    orderId: number,
    customerId: number,
    itemId: number,
    quantity: number,
    total: number,
  } = {
    orderId: 0,
    customerId: 0,
      itemId: 0,
      quantity: 0,
    total: 0,
  }
  requestPut: any
  listCustomer: any;
  listItems: any;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.emptyForm();
    this.getAllCustomer();
    this.getAllItems();
  }

  emptyForm() {
    this.mode = 'add';
    if (this.orderId) {
      this.mode = 'edit';
      this.getOrderById(this.orderId);
    } 
  }

  getOrderById(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe((res: any) => {
      console.log("res", res.data)
      this.formModel = {
        orderId: res.data.orderId,
        customerId: res.data.customer.customerId,
        itemId: res.data.item.itemId,
        quantity: res.data.quantity,
        total: res.data.totalPrice,
      }
      console.log("formModel", this.formModel);
    })
  }

  save() {
    if (this.mode === 'add') {
      this.orderService.postOrder(this.formModel).subscribe(
        (res: any) => {
          if(res.statusCode === 200) {
            this.afterSave.emit(res);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Order has been added'
            });
          }else if(res.statusCode === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while adding the order'
            });
          
          }
        }
      );
    } else {
      const requestDataJson = JSON.stringify(this.formModel);
      console.log("requestDataJson", requestDataJson);
      const data = new FormData();
      data.append('request', new Blob([requestDataJson], {
        type: 'application/json'
      }));
      this.orderService.putOrder(data).subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.afterSave.emit(res);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Order has been updated'
            });
          } else if (res.statusCode === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message||'An error occurred while updating the order'
            });
          }
        }
      );
    }
  }
  

  getAllCustomer() {
    this.orderService.getAllCustomer().subscribe((res: any) => {
      this.listCustomer = res.data;
    })
  }

  getAllItems() {
    this.orderService.getAllItems().subscribe((res: any) => {
      this.listItems = res.data;
    })
  }


}

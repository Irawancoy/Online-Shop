import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-customers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form-customers.component.html',
  styleUrl: './form-customers.component.css'
})
export class FormCustomersComponent {
  @Input() customerId: any;
  @Output() afterSave = new EventEmitter<any>();
  mode: string | undefined;
  formModel: any
  requestPut: any
  imgSrc: any

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
  this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      customerId: 0,
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      isActive: 1,
      pic: '',
    }
    if (this.customerId) {
      this.mode = 'edit';
      this.getCustomerById(this.customerId);
    }
    
  }

  getCustomerById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((res: any) => {
      this.formModel = res.data;
    })
  }

  save() {
    if (this.mode === 'add') {
      const requestDataJson = JSON.stringify(this.formModel);
      const data = new FormData();
      data.append("request", new Blob([requestDataJson], {
        type: "application/json"
      }));
      if (this.formModel.pic) {
        data.append("file", this.imgSrc);
      }
      this.customerService.postCustomer(data).subscribe((res: any) => {
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer has been added',
        })
      })
    } else {
      console.log(this.formModel);
      const requestDataJson = JSON.stringify(this.formModel);
      const data = new FormData();
      data.append("request", new Blob([requestDataJson], {
        type: "application/json"
      }));
      if (this.formModel.pic) {
        data.append("file", this.imgSrc);
      }
      this.customerService.putCustomer(data).subscribe((res: any) => {
        console.log(data);
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer has been updated',
        })
      })
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }
    const file = input.files[0];
    this.formModel.pic = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.formModel.pic = e.target.result;
    }
    reader.readAsDataURL(file);

    this.imgSrc = file;
    console.log("aaa"+this.imgSrc);
  }
  

  
  

}

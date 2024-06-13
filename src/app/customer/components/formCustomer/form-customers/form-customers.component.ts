import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-customers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
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
      this.customerService.postCustomer(this.formModel).subscribe((res: any) => {
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer has been added',
        })
      })
    } else {
      const requestDataJson = JSON.stringify(this.formModel);
      const data = new FormData();
      data.append("request", new Blob([requestDataJson], {
        type: "application/json"
      }));
      this.customerService.putCustomer(data).subscribe((res: any) => {
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer has been updated',
        })
      })
    }
  }
  

  
  

}

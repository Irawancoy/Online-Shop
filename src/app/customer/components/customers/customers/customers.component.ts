import { CommonModule } from '@angular/common';
import { CustomerService } from './../../../services/customer.service';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormCustomersComponent } from '../../formCustomer/form-customers/form-customers.component';
import { DetailCustomerComponent } from '../../detailCustomer/detail-customer/detail-customer.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    FormCustomersComponent,
    DetailCustomerComponent 
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  modelId:any
  listCustomer: any[
  ] = [];
  totalItems: any
  pageSize: number = 8;
  pageNumber: number = 1;
  dataSource = new MatTableDataSource<any>(this.listCustomer);

  

  displayedColumns: string[] = [
    'no',
    'id',
    'name',
    'address',
    'code',
    'phone',
    'isActive',
    'lastOrderDate',
    'pic',
    'actions',
  ];

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal

  ) {}

  ngOnInit(): void {
    this.getCustomer(this.pageNumber, this.pageSize);
  }

  getCustomer(pageNumber:number,pageSize:number) {
    this.customerService.getCustomers(pageNumber,pageSize).subscribe((res: any) => {
      this.listCustomer = res.data;
      this.totalItems = res.total;
      this.dataSource = new MatTableDataSource<any>(this.listCustomer);
      console.log(res);
    })
  
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getCustomer(this.pageNumber,this.pageSize);
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      Swal.fire({
        title: 'Success',
        text: 'Customer deleted',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.getCustomer( this.pageNumber,this.pageSize);
    });
  }

  createCustomer(modal: any) {
    this.modelId = 0;
    this.modalService.open(modal, { size: 'lg' });
  }

  updateCustomer(modal: any, id: number) {
    this.modelId = id;
    this.modalService.open(modal, { size: 'lg' });
  }

  reload() {
    window.location.reload();
  }

  showDetail(modal: any, id: number) {
    this.modelId = id;
    this.modalService.open(modal, { size: 'lg' });
  }
  getRowIndex(index: number): number {
    return (this.pageNumber - 1) * this.pageSize + index + 1;
  }
}

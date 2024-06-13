import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormOrderComponent } from '../../formOrder/form-order/form-order.component';
import { DetailOrderComponent } from '../../detailOrder/detail-order/detail-order.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    FormOrderComponent,
    DetailOrderComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  modelId: any
  listOrders: any[] = [];
  totalItems: any
  pageSize: number = 8;
  pageNumber: number = 1
  dataSource = new MatTableDataSource<any>(this.listOrders)

  displayedColumns: string[] = [
    'no',
    'id',
    'code',
    'orderDate',
    'customerName',
    'itemName',
    'price',
    'quantity',
    'total',
    'actions'
  ]

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getOrders(this.pageNumber, this.pageSize)
  }

  getOrders(pageNumber: number, pageSize: number) {
    this.orderService.getOrders(pageNumber, pageSize).subscribe((res: any) => {
      this.listOrders = res.data
      this.totalItems = res.total
      this.dataSource = new MatTableDataSource<any>(this.listOrders)
    })
  }
  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1
    this.pageSize = event.pageSize
    this.getOrders(this.pageNumber, this.pageSize)
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe((res: any) => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Data has been deleted',
        confirmButtonText: 'Ok'
      })
      this.getOrders(this.pageNumber, this.pageSize)
    })
  }

  createOrder(modal: any) {
    this.modelId = 0
    this.modalService.open(modal, { size: 'lg' })
  }

  updateOrder(modal: any, id: number) {
    this.modelId = id
    this.modalService.open(modal, { size: 'lg' })
  }

  reload() {
    window.location.reload()
  }

  getRowIndex(index: number): number {
    return (this.pageNumber - 1) * this.pageSize + index + 1
  }

  showDetail(modal: any, id: number) {
    this.modelId = id
    this.modalService.open(modal, { size: 'lg' })
  }

  generatePdf() {
    this.orderService.generateReport('pdf').subscribe((res: any) => {
      console.log(res)
      if(res.statusCode == 200) {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Report has been generated',
          confirmButtonText: 'Ok'       
        })
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Failed to generate report',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  
}

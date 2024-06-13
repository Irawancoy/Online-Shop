import { Component } from '@angular/core';
import { ItemService } from './../../../services/item.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormItemComponent } from '../../formItem/form-item/form-item.component';
import { DetailItemComponent } from '../../detailItem/detail-item/detail-item.component';


@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    FormItemComponent,
    DetailItemComponent

  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  modelId: any
  listItems: any[] = [];
  totalItems: any
  pageSize: number = 8;
  pageNumber: number = 1
  dataSource = new MatTableDataSource<any>(this.listItems)

  displayedColumns: string[] = [
    'no',
    'id',
    'name',
    'code',
    'price',
    'stock',
    'isAvailable',
    'lastReStock',
    'actions'
  ]

  constructor(
    private itemService: ItemService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getItems(this.pageNumber, this.pageSize)
  }

  getItems(pageNumber: number, pageSize: number) {
    this.itemService.getItems(pageNumber, pageSize).subscribe((res: any) => {
      this.listItems = res.data
      this.totalItems = res.total
      this.dataSource = new MatTableDataSource<any>(this.listItems)
      console.log(this.listItems)
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1
    this.pageSize = event.pageSize
    this.getItems(this.pageNumber, this.pageSize)
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => {
      Swal.fire({
        title: 'Success',
        text: 'Customer deleted',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      this.getItems( this.pageNumber,this.pageSize);
    });
  }

  createItem(modal: any) {
    this.modelId = 0
    this.modalService.open(modal, { size: 'lg' })
  }

  updateItem(modal: any, id: number) {
    this.modelId = id
    this.modalService.open(modal, { size: 'lg' })
  }

  
  reload() {
    window.location.reload();
  }

  getRowIndex(index: number): number {
    return (this.pageNumber - 1) * this.pageSize + index + 1;
  }

  showDetail(modal: any, id: number) {
    this.modelId = id;
    this.modalService.open(modal, { size: 'lg' });
  }


}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.css'
})
export class FormItemComponent {
  @Input() itemId: any;
  @Output() afterSave = new EventEmitter<any>();
  mode: string | undefined;
  formModel: any
  requestPut: any

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit(): void {
    this.emptyForm();
  }

  emptyForm() {
    this.mode = 'add';
    this.formModel = {
      itemId: 0,
      itemName: '',
      itemPrice: '',
      itemStock: '',
      isAvailable: 1,
    }
    if (this.itemId) {
      this.mode = 'edit';
      this.getItemById(this.itemId);
    } 
  }

  getItemById(itemId: number) {
    this.itemService.getItemById(itemId).subscribe((res: any) => {
      this.formModel = res.data;
    })
  }

  save() {
    if (this.mode === 'add') {
      this.itemService.postItem(this.formModel).subscribe((res: any) => {
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item has been added'
        })
      })
    } else {
      const requestDataJson = JSON.stringify(this.formModel);
      console.log(requestDataJson);
      const data = new FormData();
      data.append('request', new Blob([requestDataJson], {
        type: 'application/json'
      }));
      this.itemService.putItem(data).subscribe((res: any) => {
        console.log(res);
        this.afterSave.emit(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Item has been updated'
        })
      })
    }
  }

}

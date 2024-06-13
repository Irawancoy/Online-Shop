import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ItemService } from '../../../services/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './detail-item.component.html',
  styleUrl: './detail-item.component.css'
})
export class DetailItemComponent {
  @Input() itemId: any;
  detailItem: any

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit(): void {
    this.getItemById(this.itemId);
  }

  getItemById(itemId: number) {
    this.itemService.getItemById(itemId).subscribe((res: any) => {
      this.detailItem = res.data;
    })
  }

}

import { Component, Input } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule,
    CommonModule
  
  ],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class DetailOrderComponent {
  @Input() orderId: any;
  detailOrder: any

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrderById(this.orderId);
  }

  getOrderById(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe((res: any) => {
      this.detailOrder = res.data;
    })
  }

}

import { CustomerService } from './../../../services/customer.service';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-detail-customer',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css'
})
export class DetailCustomerComponent {
  @Input() customerId: any;
  detailCustomer: any
  constructor(
    private customerService: CustomerService,
  ) { }
  
  ngOnInit(): void {
    this.getCustomerById(this.customerId);
  }

  getCustomerById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((res: any) => {
      this.detailCustomer = res.data;
    })
  }

}

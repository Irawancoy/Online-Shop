import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CustomersComponent } from './customer/components/customers/customers/customers.component';
import { ItemsComponent } from './item/components/items/items/items.component';
import { OrderComponent } from './order/components/order/order/order.component';

export const routes: Routes = [
   {
      path: '', component: CustomersComponent
   },
   {
      path:'customers', component: CustomersComponent
   },
   {
      path:'items', component: ItemsComponent
   },
   {
      path: 'orders', component:OrderComponent
   }
];



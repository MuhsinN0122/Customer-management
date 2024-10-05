import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from "../top-menu/top-menu.component";
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [TopMenuComponent,CommonModule,AddCustomerComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customerId: any = sessionStorage.getItem("customerId"); // get customer id from session storage
  purpose = sessionStorage.getItem("purpose");
  customerDetails: any;
  constructor(private api: CustomerService, private router: Router) { }
  ngOnInit() {
    this.customerData();
  }
  customerData() {
    // api for getting customer details
    this.api.customerDetails(this.customerId).subscribe((data) => {
      this.customerDetails = data;
    });
  }
  back() { this.router.navigateByUrl('/customer-list') } // function to perform navigation
}

import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from "../top-menu/top-menu.component";

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [TopMenuComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  cutomerId: any = sessionStorage.getItem("customerId"); // get customer id from session storage
  customerDetails: any;
  constructor(private api: CustomerService, private router: Router) { }
  ngOnInit() {
    this.customerData();
  }
  customerData() {
    // api for getting customer details
    this.api.customerDetails(this.cutomerId).subscribe((data) => {
      this.customerDetails = data;
    });
  }
  back() { this.router.navigateByUrl('/customer-list') } // function to perform navigation
}

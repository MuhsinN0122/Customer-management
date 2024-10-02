import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import Swal from 'sweetalert2';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, TopMenuComponent,
    MatButtonModule, MatIconModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatPaginatorModule, MatInputModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  customerList: any;
  searchControl = new FormControl();
  paginatedCustomers: any[] = [];
  filteredCustomers: any;
  // Pagination variables
  currentPage = 0;
  pageSize = 5; // Default page size
  totalCustomers = 0;
  constructor(private api: CustomerService, private router: Router) { }
  ngOnInit() {
    this.loadCustomers();
  }
  loadCustomers() {
    this.api.listCustomers().subscribe((data) => {
      this.customerList = data;
      this.filteredCustomers = data;
      // Listen for changes in the search input
      this.searchControl.valueChanges
        .pipe(debounceTime(300))  // Optional: debounce to avoid too many API calls on fast typing
        .subscribe(searchTerm => {
          console.log(this.searchControl.value)
          this.filterCustomers(searchTerm);
        });
      this.totalCustomers = this.filteredCustomers.length;
      this.updatePaginatedCustomers();
    });
  }
  // View customer
  viewCustomer(customerId: any) {
    sessionStorage.setItem("customerId", customerId);
    this.router.navigateByUrl('/customer-details');
  }
  // delete customer by passing customerId and data type any.
  deleteCustomer(customerId: any) {
    //Show confirmation message for deleting customer.
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      // if we click 'Yes, delete it!' , below if condition works.
      if (result.isConfirmed) {
        // Call the delete api for deleting customer.
        this.api.deleteCustomer(customerId).subscribe((data) => {
          Swal.fire(
            'Deleted!',
            'The customer has been deleted.',
            'success'
          );
        });
      }
    });
  }
  // loadCustomers(): void {
  //   this.customerService.getCustomers().subscribe(customers => {
  //     this.customerList = customers;
  //     this.totalCustomers = customers.length;
  //     this.updatePaginatedCustomers();
  //   });
  // }

  // Function to filter customers based on the search term
  filterCustomers(searchTerm: string): void {
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      this.filteredCustomers = this.customerList.filter((customer: { name: string; }) =>
        customer.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredCustomers = this.customerList;  // If search term is empty, show all customers
    }
    this.totalCustomers = this.filteredCustomers.length;
    this.currentPage=0;  // if we search the customer name in second page , switch to 1st page.
    this.updatePaginatedCustomers();
  }
  updatePaginatedCustomers(customers: any[] = this.filteredCustomers): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedCustomers = customers.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCustomers();
  }
  addCustomer() {
    sessionStorage.setItem("customerId", 'null');
    this.router.navigateByUrl('/add-customer');
  }
}
